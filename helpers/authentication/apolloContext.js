import jwt from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server-express';
import gql from 'graphql-tag';
import checkPermissions from './checkPermissions';
import { secret } from '../../config/config.json';

/**
 * Returns GraphQL action from string
 * @returns {string}
 * @param queryString
 */
function getGraphQLAction(queryString) {
  return gql(queryString).definitions[0].selectionSet.selections[0].name.value;
}

/**
 * Authorization by session or JWT, depending of the header "Authorization"
 * @param myAcl
 * @returns {Function}
 */
export default async ({ req, res, connection }) => {
  // if (connection) return {};

  let role;
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
    console.log(role, token, allowed);
  } else allowed = await checkPermissions(action, 'guest');

  if (!allowed) throw new AuthenticationError('Access Denied');

  return res;
};
