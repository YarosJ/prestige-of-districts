import { gql } from 'apollo-server-express';
import globalTypes from './globalTypes.ts';
import taskSchema from './target.ts';
import messageSchema from './message.ts';
import failureSchema from './failure.ts';
import permissionSchema from './permission.ts';
import userSchema from './user.ts';
import screenshot from './screenshot.ts';
import selector from './selector.ts';
import total from './total.ts';

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
