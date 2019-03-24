import gql from 'graphql-tag';

export const GET_USERS = gql`
  query($cursor: Int, $limit: Int) {
    users(cursor: $cursor, limit: $limit) {
      id
      email
      role
      cart {
        id
        title
        body
        price
        user {
          id
          email
        }
      }
    }
  }
`;
