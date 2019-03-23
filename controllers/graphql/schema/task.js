import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    tags: [String!]
  }

  extend type Mutation {
    addTarget(URL: String!, tagPaths: [String], freq: Int, city: String, country: String): TaskTarget
    removeTarget(URL: String): TaskTarget
    updateTarget(URL: String!, tagPaths: [String], freq: Int, city: String, country: String): TaskTarget
  }

  type TaskTarget {
    URL: String!
    tagPaths: [String]
    freq: Int
    city: String
    country: String
  }
`;
