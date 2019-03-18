import { gql } from 'apollo-server-express';

export default {
  GET_FAILURE: gql`
      query($latitude: Float, $longitude: Float, $date: String, $range: RangeInput) {
          failures(latitude: $latitude, longitude: $longitude, date: $date, range: $range) {
              failureType
              service
              text
              locations {
                latitude
                longitude
              }
          }
      }
  `,
  ADD_FAILURE: gql`
      mutation($country: String, $city: String, 
      $locations: [String], $failureType: String!, 
      $service: String!, $text: String!, $date: String) {
           addFailure(country: $country, city: $city,
           locations: $locations, failureType: $failureType, 
           service: $service, text: $text, date: $date) {
              failureType
              service
              text
              locations {
                latitude
                longitude
              }
          }
      }
  `,
  REMOVE_FAILURE: gql`
      mutation($date: String!, $latitude: Float, $longitude: Float) {
          removeFailure(date: $date, latitude: $latitude, longitude: $longitude) {
              failureType
              service
              text
              locations {
                latitude
                longitude
              }
          }
      }
  `,
};