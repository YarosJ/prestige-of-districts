import { gql } from 'apollo-server-express';

/**
 * Schema definition for messages
 */

export default gql`
  extend type Query {
    messages(
      latitude: Float,
      longitude: Float,
      locRange: LocRangeInput,
      locType: String,
      dateRange: DateRangeInput
    ): [Message]
  }

  extend type Mutation {
    addMessage(
      country: String,
      city: String,
      locations: [String],
      service: String,
      text: String,
      date: String
    ): Message

    removeMessage(
      date: String,
      latitude: Float,
      longitude: Float,
      id: String,
      locType: String
    ): Message
  }

  extend type Subscription {
    messageAdded: Message
    messageRemoved: Message
  }

  type Message {
    id: String!
    service: String!
    text: String!
    happenedAt: String!
    locations: [Location]
  }
`;
