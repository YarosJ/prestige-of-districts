import { gql } from 'apollo-server-express';

/**
 * Schema definition for permissions
 */

export default gql`
  extend type Query {
    roles: [Permission!]!
    actions(role: String!): Actions!
  }

  extend type Mutation {
    addRole(role: String!, actions: [String]): Permission!
    addAction(role: String!, action: String!): Permission!
    deleteRole(role: String!): Permission!
    deleteAction(role: String!, action: String!): Permission!
  }

  type Actions {
    actions: [String]
  }

  type Permission {
    role: String!
    actions: [String]
  }
`;
