import { gql } from 'apollo-server-express';

export default {
  GET_TAGS: gql`
      query {
          tags
      }
  `,
  ADD_TARGET: gql`
      mutation($URL: String!, $tagPaths: [String], $freq: Int, $city: String, $country: String) {
          addTarget(URL: $URL, tagPaths: $tagPaths, freq: $freq, city: $city, country: $country) {
            URL
            freq
          }
      }
  `,
  UPDATE_TARGET: gql`
      mutation($URL: String!, $tagPaths: [String], $freq: Int, $city: String, $country: String) {
          updateTarget(URL: $URL, tagPaths: $tagPaths, freq: $freq, city: $city, country: $country) {
            URL
            tagPaths
            freq
            city
            country
          }
      }
  `,
  REMOVE_TARGET: gql`
      mutation($URL: String!) {
          removeTarget(URL: $URL) {
            URL
          }
      }
  `,
};