import gql from 'graphql-tag';

export const GET_USER = gql`
  query($id: ID!) {
    user(id: $id) {
      id
      email
    }
  }
`;

export const GET_TOTAL = gql`
  query($target: String) {
    total(target: $target) {
      count
    }
  }
`;

export const GET_FAILURE = gql`
      query($latitude: Float, $longitude: Float, $date: String, $locRange: LocRangeInput, $dateRange: DateRangeInput) {
          failures(latitude: $latitude, longitude: $longitude, date: $date, locRange: $locRange, dateRange: $dateRange) {
              id
              failureType
              service
              text
              happenedAt
              locations {
                place
                latitude
                longitude
                locType
              }
          }
      }
  `;

export const GET_MESSAGES = gql`
      query($latitude: Float, $longitude: Float, $date: String, $locRange: LocRangeInput, $dateRange: DateRangeInput) {
          messages(latitude: $latitude, longitude: $longitude, date: $date, locRange: $locRange, dateRange: $dateRange) {
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
  `;
