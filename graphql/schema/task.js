import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    tags: [String!]
  }

  extend type Mutation {
    addTarget(URL: String!, dataListeners: [ListenerInput]): Target
    addListeners(URL: String!, dataListeners: [ListenerInput]): Target
    removeTarget(URL: String): Target
    removeListeners(URL: String!, dataListeners: [String!]): Target
    updateListener(URL: String!, dataListener: ListenerInput!): Target
  }

  extend type Subscription {
    targetAdded: Target
    targetRemoved: Target
    listenersAdded: Target
    listenersRemoved: Target
    listenerUpdated: Target
  }

  input ListenerInput {
    dataListener: String
    freq: Int
    tags: [String]
  }

  type Target {
    URL: String!
    dataListeners: [String]
  }
`;
