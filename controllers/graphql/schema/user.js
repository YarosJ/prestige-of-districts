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
  
  extend type Subscription {
    userAdded: User!
    userUpdated: User!
    userDeleted: User!
  }
  
  type User {
    id: ID!
    email: String
    role: String
    password: String!
    createdAt: String!
    projects: [Project]
    cart: [Project]
    orders: [Order]
  }
  
  type ProtectedUser {
    id: ID!
    email: String
    role: String
    createdAt: String!
    projects: [Project]
    orders: [Order]
    cart: [Project]
  }
  
  type Authorization {
    refreshToken: String!
    accessToken: String!
    user: User
  }
`;
