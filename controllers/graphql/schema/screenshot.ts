import { gql } from 'apollo-server-express';

/**
 * Schema definition for screenshot
 */

export default gql`
  extend type Query {
    screenshot(URL: String!): Screenshot!
  }

  extend type Subscription {
    screenshotReceived: Screenshot!
  }

  type Screenshot {
    resultData: String
    URL: String
  }
`;
