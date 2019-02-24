import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    messages(latitude: String, longitude: String, date: String, range: Range): [Message]
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
    latitude: Int
    longitude: Int
  }
`;
