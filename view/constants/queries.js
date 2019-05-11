import gql from 'graphql-tag';

export const GET_USER = gql`
  query($id: ID!) {
    user(id: $id) {
      id
      email
      role
      createdAt
    }
  }
`;

export const GET_SERVICES = gql`
  query {
    services
  }
`;

export const GET_TOTAL = gql`
  query($target: String) {
    total(target: $target) {
      count
    }
  }
`;

export const GET_FAILURES = gql`
  query($latitude: Float, $longitude: Float, $locRange: LocRangeInput, $dateRange: DateRangeInput, $services: [String]) {
    failures(latitude: $latitude, longitude: $longitude, locRange: $locRange, dateRange: $dateRange, services: $services) {
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
  query($latitude: Float, $longitude: Float, $locRange: LocRangeInput, $dateRange: DateRangeInput) {
    messages(latitude: $latitude, longitude: $longitude, locRange: $locRange, dateRange: $dateRange) {
      id
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
