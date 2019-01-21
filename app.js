import express from 'express';
import http from 'http';
import { ApolloServer } from 'apollo-server-express';
import { RedisCache } from 'apollo-server-cache-redis';
import mongoose from 'mongoose';
import resolvers from './graphql/resolvers';
import typeDefs from './graphql/schema';
import mongooseConnect from './config/mongooseConnect';
import startParser from './helpers/startParser';
import { serverPort, endpoint } from './config/config.json';

const app = express();

/**
 * Connecting middleware
 */

mongooseConnect(mongoose, process, () => {
  console.log('Mongoose connected!');
  startParser();
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  cache: new RedisCache({
    host: '127.0.0.1',
  }),
  cacheControl: true,
});

server.applyMiddleware({ app, endpoint });

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

httpServer.listen(serverPort, () => {
  console.log(
    `🚀 Server ready at http://localhost:${serverPort}${server.graphqlPath}`,
  );
  console.log(
    `🚀 Subscriptions ready at ws://localhost:${serverPort}${
      server.subscriptionsPath
    }`,
  );
});

module.exports = app;
