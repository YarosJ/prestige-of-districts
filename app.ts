/* eslint-disable @typescript-eslint/no-explicit-any */

import express from 'express';
import * as http from 'http';
import path from 'path';
import { ApolloServer } from 'apollo-server-express';
import { RedisCache } from 'apollo-server-cache-redis';
import mongoose from 'mongoose';
import { express as voyagerMiddleware } from 'graphql-voyager/middleware';
import resolvers from './controllers/graphql/resolvers';
import typeDefs from './controllers/graphql/schema';
import mongooseConnect from './config/mongooseConnect.ts';
import startParser from './config/startParser.ts';
import context from './helpers/authentication/apolloContext';
import { serverPort, endpoint } from './config/config.json';
import seedDB from './config/seedDB';

const debugServer = require('debug')('Server');

const app: Express.Application = express();

/**
 * Connecting mongoose middleware
 * and starting NLP and Parser
 */

mongooseConnect(mongoose, process, (): void => {
  seedDB();
  startParser();

  if (process.env.UML === 'true') {
    // UML diagrams of graphql API
    app.use('/voyager', voyagerMiddleware({
      endpointUrl: '/graphql',
      displayOptions: {
        sortByAlphabet: true,
      },
    }));
  }

  app.get('*.js', (req, res, next): void => {
    req.url += '.gz';
    res.set('Content-Encoding', 'gzip');
    res.set('Content-Type', 'text/javascript');
    next();
  });

  app.use(express.static(path.join(__dirname, './view/public')));
  app.use(express.static(path.join(__dirname, './view/public/build')));

  app.use((req, res): void => {
    res.sendFile(path.join(__dirname, './view/public/index.html'));
  });
});

/**
 * creating ApolloServer
 * @type {ApolloServer}
 */

const server: ApolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  cache: new RedisCache({
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: process.env.REDIS_PORT || 6379,
  }) as any,
  cacheControl: true,
});

/**
 * Adding middleware
 */
server.applyMiddleware({
  app,
  endpoint,
} as any);

/**
 * Creating server and adding subscriptions
 * @type {Server | Http2Server | Promise<any>}
 */

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

/**
 * Listening server port
 */

httpServer.listen(serverPort, (): void => {
  debugServer(
    `🚀 Server ready at http://localhost:${serverPort}${server.graphqlPath}`,
  );
  debugServer(
    `🔌 Subscriptions ready at ws://localhost:${serverPort}${
      server.subscriptionsPath
    }`,
  );
  if (process.env.UML === 'true') {
    debugServer(
      `🔍 GraphQL UML diagrams ready at http://localhost:${serverPort}/voyager`,
    );
  }
});

module.exports = app;
