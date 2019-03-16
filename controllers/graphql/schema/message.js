import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    messages(latitude: Float, longitude: Float, date: String, range: RangeInput): [Message]
  }

  extend type Mutation {
    addMessage(parentLocation: String, locations: [String], failureType: String, service: String, text: String): Message
    removeMessage(date: String): Message
  }

  extend type Subscription {
    messageAdded: Message
    messageRemoved: Message
  }

  type Message {
    latitude: Float
    longitude: Float
  }
`;
