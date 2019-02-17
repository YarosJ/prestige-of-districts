import express from 'express';
import http from 'http';
import { ApolloServer } from 'apollo-server-express';
import { RedisCache } from 'apollo-server-cache-redis';
import mongoose from 'mongoose';
import resolvers from './graphql/resolvers';
import typeDefs from './graphql/schema';
import mongooseConnect from './config/mongooseConnect';
import startParser from './helpers/startParser';
import spawnChildProcess from './helpers/spawnChildProcess';
import { serverPort, endpoint } from './config/config.json';

const debugServer = require('debug')('Server');

const app = express();

/**
 * Connecting mongoose middleware
 * and starting NLP and Parser
 */
mongooseConnect(mongoose, process, () => {
  spawnChildProcess('python3', ['./NLP/app.py'], 'NLP python');
  // noinspection JSIgnoredPromiseFromCall
  startParser();
});

/**
 * Using ApolloServer
 * @type {ApolloServer}
 */
const server = new ApolloServer({
  typeDefs,
  resolvers,
  cache: new RedisCache({
    host: '127.0.0.1',
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
    `🚀 Subscriptions ready at ws://localhost:${serverPort}${
      server.subscriptionsPath
    }`,
  );
});

module.exports = app;
