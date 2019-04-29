import { gql } from 'apollo-server-express';

export default {
  GET_MESSAGE: gql`
      query($latitude: Float, $longitude: Float, $date: String, $range: RangeInput) {
          messages(latitude: $latitude, longitude: $longitude, date: $date, range: $range) {
              id
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
  ADD_MESSAGE: gql`
      mutation($country: String, $city: String, $locations: [String],
      $service: String!, $text: String!, $date: String) {
           addMessage(country: $country, city: $city, locations: $locations,
           service: $service, text: $text, date: $date) {
              id
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
  REMOVE_MESSAGE: gql`
      mutation($date: String, $latitude: Float, $longitude: Float, $id: String) {
          removeMessage(date: $date, latitude: $latitude, longitude: $longitude, id: $id) {
              id
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
