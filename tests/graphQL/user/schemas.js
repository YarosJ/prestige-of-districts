import { gql } from 'apollo-server-express';

export default {
  GET_USER: gql`
      query($id: ID!) {
          user(id: $id) {
              id
              email
              role
              createdAt
              targets {
                tag
                latitude
                longitude
                radius
              }
          }
      }
  `,
  GET_USERS: gql`
      query($cursor: Int, $limit: Int) {
          users(cursor: $cursor, limit: $limit) {
              id
              email
              role
              createdAt
              targets {
                tag
                latitude
                longitude
                radius
              }
          }
      }
  `,
  SIGN_UP: gql`
      mutation($email: String!, $password: String!) {
         signUp(email: $email, password: $password) {
            id
            email
            role
            createdAt
            targets {
              tag
              latitude
              longitude
              radius
            }
        }
      }
  `,
  SIGN_IN: gql`
      mutation($email: String!, $password: String!) {
         signIn(email: $email, password: $password) {
            refreshToken
            accessToken
            user {
                id
                email
                role
                createdAt
                targets {
                  tag
                  latitude
                  longitude
                  radius
                }
            }
        }
      }
  `,
  REFRESH_TOKEN: gql`
      mutation($refreshToken: String!) {
         refreshToken(refreshToken: $refreshToken) {
            refreshToken
            accessToken
        }
      }
  `,
  UPDATE_USER: gql`
      mutation($id: ID!, $email: String, $previousPassword: String, $newPassword: String, $role: String) {
         updateUser(id: $id, email: $email, previousPassword: $previousPassword, newPassword: $newPassword, role: $role) {
            id
            email
            role
            createdAt
            targets {
              tag
              latitude
              longitude
              radius
            }
        }
      }
  `,
  DELETE_USER: gql`
      mutation($id: ID!) {
         deleteUser(id: $id)
      }
  `,
};
