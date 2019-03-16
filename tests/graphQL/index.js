import mongoose from 'mongoose';
import { ApolloServer } from 'apollo-server-express';
import { RedisCache } from 'apollo-server-cache-redis';
import { describe } from 'mocha';
import { assert } from 'chai';
import mongooseConnect from '../../config/mongooseConnect';
import typeDefs from '../../controllers/graphql/schema';
import resolvers from '../../controllers/graphql/resolvers';
import testTarget from './task';
import testFailure from './failure';

const { createTestClient } = require('apollo-server-testing');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  cache: new RedisCache({
    host: '127.0.0.1',
  }),
  cacheControl: true,
});

describe('start server', () => {
  // eslint-disable-next-line no-undef
  it('connect mongoose', () => {
    try {
      mongooseConnect(mongoose, process, () => {
        assert.isOk('mongoose connected');
      });
    } catch (e) {
      assert.fail(e);
    }
  });

  // eslint-disable-next-line no-undef
  it('start apollo server', () => {
    assert.isObject(server, 'apollo server started');
  });
});

export default async () => {
  const testClient = createTestClient(server);
  await testTarget(testClient);
  await testFailure(testClient);
};
