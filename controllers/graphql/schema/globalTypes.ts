import { gql } from 'apollo-server-express';

export default gql`
  input LocRangeInput {
    maxLatitude: Float
    minLatitude: Float
    maxLongitude: Float
    minLongitude: Float
  }

  input DateRangeInput {
    maxDate: String
    minDate: String
  }

  type Location {
    place: String
    latitude: Float
    longitude: Float
    locType: String
  }
`;
