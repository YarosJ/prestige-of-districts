import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    tags: [String!]
  }

  extend type Mutation {
    addTarget(URL: String!, tagPaths: [String], freq: Int, city: String, country: String): Target
    addListeners(URL: String!, dataListeners: [String]): Target
    removeTarget(URL: String): Target
    removeListeners(URL: String!, dataListeners: [String!]): Target
    updateListener(URL: String!, tagPaths: [String], freq: Int, dataListeners: [String]): Target
  }

  extend type Subscription {
    targetAdded: Target
    targetRemoved: Target
    listenersAdded: Target
    listenersRemoved: Target
    listenerUpdated: Target
  }

  type Target {
    URL: String!
    tagPaths: [String]
    freq: Int
    city: String
    country: String
  }
`;
