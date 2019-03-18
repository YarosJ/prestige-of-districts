import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    failures(latitude: Float, longitude: Float, date: String, range: RangeInput): [Failure]
  }

  extend type Mutation {
    addFailure(country: String, city: String, locations: [String], failureType: String!, service: String!, text: String!, date: String): Failure
    removeFailure(date: String!, latitude: Float, longitude: Float): Failure
  }

  extend type Subscription {
    failureAdded: Failure
    failureRemoved: Failure
  }

  type Location {
    latitude: Float
    longitude: Float
  }

  type Failure {
    failureType: String!
    service: String!
    text: String!
    locations: [Location]
  }
`;
