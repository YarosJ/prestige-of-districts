import gql from 'graphql-tag';

export const GET_USERS = gql`
  query($cursor: Int, $limit: Int) {
    users(cursor: $cursor, limit: $limit) {
      id
      email
      role
    }
  }
`;

export const GET_TARGETS = gql`
  query {
    targets {
      id
      URL
      tagPaths
      freq
      city
      country
    }
  }
`;
