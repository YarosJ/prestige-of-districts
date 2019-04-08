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

export const UPDATE_TARGET = gql`
    mutation($URL: String!, $tagPaths: [String], $freq: Int, $city: String, $country: String) {
        updateTarget(URL: $URL, tagPaths: $tagPaths, freq: $freq, city: $city, country: $country) {
          id
          URL
          tagPaths
          freq
          city
          country
        }
    }
`;

export const GET_SCREENSHOT = gql`
  query($URL: String!) {
    screenshot(URL: $URL) {
      resultData
      URL
    }
  }
`;

export const GET_SELECTOR = gql`
  query($URL: String!, $x: String!, $y: String!) {
    selector(URL: $URL, x: $x, y: $y) {
      resultSelector
      URL
    }
  }
`;
