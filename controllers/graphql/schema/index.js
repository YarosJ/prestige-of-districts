import { gql } from 'apollo-server-express';
import globalTypes from './globalTypes';
import taskSchema from './task';
import messageSchema from './message';
import failureSchema from './failure';
import permissionSchema from './permission';
import userSchema from './user';
import total from './total';

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

export default [
  linkSchema,
  globalTypes,
  taskSchema,
  messageSchema,
  failureSchema,
  permissionSchema,
  userSchema,
  total,
];
