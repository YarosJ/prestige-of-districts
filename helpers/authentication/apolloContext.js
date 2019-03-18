/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */

import jwt from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server-express';
import gql from 'graphql-tag';
import checkPermissions from './checkPermissions';
import { secret } from '../../config/config.json';

/**
 * Returns GraphQL action from string
 * @param str
 * @returns {string}
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
  if (connection) return {};

  let _id;
  let role;
  const { query } = req.body;
  const action = getGraphQLAction(query);
  const token = req.get('Authorization');

  console.log(action);
  // ---------
  return res;
  // ---------

  if (action === 'signIn' || action === 'projects' || action === 'signUp' || action === 'user' || action === 'refreshToken' || action === 'addOrder' || action ===  'project') return res;

  try {
    ({ _id, role } = jwt.verify(token, secret));
  } catch (err) {
    if (err.name === 'TokenExpiredError' || err.name === 'JsonWebTokenError') {
      throw new AuthenticationError(err);
    } else {
      throw new Error(err);
    }
  }

  const allowed = await checkPermissions(action, role);
  if (!allowed) throw new AuthenticationError('Access Denied');

  return res;
};
