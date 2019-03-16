import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    failures(latitude: Float, longitude: Float, date: String, range: RangeInput): [Failure]
  }

  extend type Mutation {
    addFailure(country: String, city: String, locations: [String], failureType: String, service: String, text: String): Failure
    removeFailure(date: String): Failure
  }

  extend type Subscription {
    failureAdded: Failure
    failureRemoved: Failure
  }

  type Failure {
    failureType: String!
    service: String!
    text: String!
    latitude: Float
    longitude: Float
  }
`;
