import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    users(cursor: Int, limit: Int): [User!]
    user(id: ID!): User
    me(id: ID!): ProtectedUser
  }

  extend type Mutation {
    signUp(email: String!, password: String!): User!
    signIn(email: String!, password: String!): Authorization!
    refreshToken(refreshToken: String!): Authorization!
    logOut(refreshToken: String!, accessToken: String!): User!
    updateUser(id: ID!, email: String, previousPassword: String, newPassword: String, role: String): User!
    deleteUser(id: ID!): Boolean!
  }

  type Target {
    tag: String!,
    latitude: Number,
    longitude: Number,
    radius: Number,
  }

  type User {
    id: ID!
    email: String
    role: String
    password: String!
    createdAt: String!
    targets: [Target]
  }

  type ProtectedUser {
    id: ID!
    email: String
    role: String
    createdAt: String!
    targets: [Target]
  }

  type Authorization {
    refreshToken: String!
    accessToken: String!
    user: User
  }
`;
