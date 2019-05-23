import * as jwt from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server-express';
import gql from 'graphql-tag';
import { ServerResponse } from 'http';
import checkPermissions from './checkPermissions';
import { secret } from '../../config/config.json';

/**
 * Returns GraphQL action from string
 */

const getGraphQLAction = (queryString: string): string => gql(queryString)
  .definitions[0].selectionSet.selections[0].name.value;

/**
 * Authorization by JWT from the header "Authorization"
 */

const context = async ({ req, res, connection }): Promise <ServerResponse | {}> => {
  if (connection) return {};

  let role: string;
  let allowed = false;
  const { query } = req.body;
  const action = getGraphQLAction(query);
  const token = req.get('Authorization');

  if (token) {
    try {
      ({ role } = jwt.verify(token, secret));
    } catch (err) {
      if (err.name === 'TokenExpiredError' || err.name === 'JsonWebTokenError') {
        throw new AuthenticationError(err);
      } else {
        throw new Error(err);
      }
    }
    allowed = await checkPermissions(action, role);
  } else allowed = await checkPermissions(action, 'guest');

  if (!allowed) throw new AuthenticationError('Access Denied');

  return res;
};

export default context;
