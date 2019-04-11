import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    tags: [String!]
    services: [String!]
    targets: [TaskTarget]
  }

  extend type Mutation {
    addTarget(URL: String!, tagPaths: [String], freq: Int, city: String, country: String): TaskTarget
    removeTarget(URL: String): TaskTarget
    updateTarget(URL: String!, tagPaths: [String], freq: Int, city: String, country: String): TaskTarget
  }

  type TaskTarget {
    id: ID!
    URL: String!
    tagPaths: [String]
    freq: Int
    city: String
    country: String
  }
`;
