import express from 'express';
import http from 'http';
import path from 'path';
import { ApolloServer } from 'apollo-server-express';
import { RedisCache } from 'apollo-server-cache-redis';
import mongoose from 'mongoose';
import resolvers from './controllers/graphql/resolvers';
import typeDefs from './controllers/graphql/schema';
import mongooseConnect from './config/mongooseConnect';
import startParser from './config/startParser';
import context from './helpers/authentication/apolloContext';
import { serverPort, endpoint } from './config/config.json';
import seedDB from './config/seedDB';

const { express: voyagerMiddleware } = require('graphql-voyager/middleware');

const debugServer = require('debug')('Server');

const app = express();

/**
 * Connecting mongoose middleware
 * and starting NLP and Parser
 */
mongooseConnect(mongoose, process, () => {
  if (process.env.seedDB) {
    // noinspection JSIgnoredPromiseFromCall
    seedDB();
  }
  // noinspection JSIgnoredPromiseFromCall
  startParser();

  if (process.env.UML) {
    // UML diagrams of graphql API
    app.use('/voyager', voyagerMiddleware({
      endpointUrl: '/graphql',
      displayOptions: {
        sortByAlphabet: true,
      },
    }));
  }

  app.use(express.static(path.join(__dirname, './view/public')));
  app.use((req, res) => {
    const contentType = req.headers['content-type'];
    if (contentType && contentType.indexOf('application/json') > -1) {
      res.status(404).json({ message: 'Resource not found' });
    } else res.sendFile(path.join(__dirname, './view/public/index.html'));
  });
});

/**
 * creating ApolloServer
 * @type {ApolloServer}
 */
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  cache: new RedisCache({
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: process.env.REDIS_PORT || 6379,
  }),
  cacheControl: true,
});

/**
 * Adding middleware
 */
server.applyMiddleware({
  app,
  endpoint,
});

/**
 * Creating server and adding subscriptions
 * @type {Server | Http2Server | Promise<any>}
 */
const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

/**
 * Listening server port
 */
httpServer.listen(serverPort, () => {
  debugServer(
    `🚀 Server ready at http://localhost:${serverPort}${server.graphqlPath}`,
  );
  debugServer(
    `🔌 Subscriptions ready at ws://localhost:${serverPort}${
      server.subscriptionsPath
    }`,
  );
  if (process.env.UML) {
    debugServer(
      `🗂 GraphQL UML diagrams ready at http://localhost:${serverPort}/voyager`,
    );
  }
});

module.exports = app;
