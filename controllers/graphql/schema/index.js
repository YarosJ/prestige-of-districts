import { gql } from 'apollo-server-express';
import taskSchema from './task';
import messageSchema from './message';
import failureSchema from './failure';
import rangeType from './globalTypes/rangeType';

const linkSchema = gql`
  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }

  type Subscription {
    _: Boolean
  }
`;

module.exports = [linkSchema, rangeType, taskSchema, messageSchema, failureSchema];
