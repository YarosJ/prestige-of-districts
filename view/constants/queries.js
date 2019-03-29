import gql from 'graphql-tag';

export const GET_USER = gql`
  query($id: ID!) {
    user(id: $id) {
      id
      email
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

export const GET_ME = gql`
  query($id: ID!) {
    me(id: $id) {
      id
      email
      role
      createdAt
      projects {
        id
      }
      orders {
        id
      }
      cart {
        id
      }
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
              locations {
                place
                latitude
                longitude
                locType
              }
          }
      }
  `;
