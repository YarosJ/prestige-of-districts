import { gql } from 'apollo-server-express';
import globalTypes from './globalTypes';
import taskSchema from './target';
import messageSchema from './message';
import failureSchema from './failure';
import permissionSchema from './permission';
import userSchema from './user';
import screenshot from './screenshot';
import selector from './selector';
import total from './total';

/**
 * Main schema definition
 */

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
  screenshot,
  selector,
  total,
];
