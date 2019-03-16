import { gql } from 'apollo-server-express';

export default {
  GET_FAILURE: gql`
      query($latitude: Float, $longitude: Float, $date: String, $range: RangeInput) {
          failures(latitude: $latitude, longitude: $longitude, date: $date, range: $range) {
              failureType
              service
              text
              latitude
              longitude
          }
      }
  `,
  ADD_FAILURE: gql`
      mutation($country: String, $city: String, $locations: [String], $failureType: String, $service: String, $text: String) {
          addFailure(country: $country, city: $city, locations: $locations, failureType: $failureType, service: $service, text: $text) {
              failureType
              service
              text
              latitude
              longitude
          }
      }
  `,
  REMOVE_FAILURE: gql`
      mutation($date: String!) {
          removeFailure(date: $date) {
              failureType
              service
              text
              latitude
              longitude
          }
      }
  `,
};