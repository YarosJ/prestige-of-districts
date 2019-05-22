import { gql } from 'apollo-server-express';

/**
 * Schema definition for selector
 */

export default gql`
  extend type Query {
    selector(URL: String!, x: String!, y: String!): Selector!
  }

  extend type Subscription {
    selectorReceived: Selector
  }

  type Selector {
    resultSelector: String
    URL: String
  }
`;
