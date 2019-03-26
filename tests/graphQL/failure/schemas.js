import { gql } from 'apollo-server-express';

export default {
  GET_FAILURE: gql`
      query($latitude: Float, $longitude: Float, $date: String, $range: RangeInput) {
          failures(latitude: $latitude, longitude: $longitude, date: $date, range: $range) {
              id
              failureType
              service
              text
              locations {
                place
                latitude
                longitude
                locType
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
              id
              failureType
              service
              text
              locations {
                place
                latitude
                longitude
                locType
              }
          }
      }
  `,
  REMOVE_FAILURE: gql`
      mutation($date: String, $latitude: Float, $longitude: Float, $id: String) {
          removeFailure(date: $date, latitude: $latitude, longitude: $longitude, id: $id) {
              id
              failureType
              service
              text
              locations {
                place
                latitude
                longitude
                locType
              }
          }
      }
  `,
};
