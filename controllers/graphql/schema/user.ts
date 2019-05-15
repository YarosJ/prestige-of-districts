import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    users(cursor: Int, limit: Int): [User!]
    user(id: ID!): User
  }

  extend type Mutation {
    signUp(
      email: String!,
      password: String!
    ): User!

    signIn(
      email: String!,
      password: String!
    ): Authorization!

    refreshToken(refreshToken: String!): Authorization!

    logOut(
      refreshToken: String!,
      accessToken: String!
    ): User!

    updateUser(
      id: ID!,
      email: String,
      previousPassword: String,
      newPassword: String,
      role: String
    ): User!

    deleteUser(id: ID!): Boolean!
  }

  type UserTarget {
    tag: String!,
    latitude: Float,
    longitude: Float,
    radius: Float,
  }

  type User {
    id: ID!
    email: String
    role: String
    password: String!
    createdAt: String!
    targets: [UserTarget]
  }

  type ProtectedUser {
    id: ID!
    email: String
    role: String
    createdAt: String!
    targets: [UserTarget]
  }

  type Authorization {
    refreshToken: String!
    accessToken: String!
    user: User
  }
`;
