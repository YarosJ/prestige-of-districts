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

export const ADD_TARGET = gql`
    mutation($URL: String!, $tagPaths: [String], $freq: Int, $city: String, $country: String) {
        addTarget(URL: $URL, tagPaths: $tagPaths, freq: $freq, city: $city, country: $country) {
          id
          URL
          tagPaths
          freq
          city
          country
        }
    }
`;
