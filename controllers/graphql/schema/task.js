import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    tags: [String!]
  }

  extend type Mutation {
    addTarget(URL: String!, tagPaths: [String], freq: Int, city: String, country: String): Target
    removeTarget(URL: String): Target
    updateTarget(URL: String!, tagPaths: [String], freq: Int, city: String, country: String): Target
  }

  type Target {
    URL: String!
    tagPaths: [String]
    freq: Int
    city: String
    country: String
  }
`;
