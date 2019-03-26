import { gql } from 'apollo-server-express';

export default gql`
  input RangeInput {
    maxLatitude: Float
    minLatitude: Float
    maxLongitude: Float
    minLongitude: Float
  }

  type Location {
    place: String
    latitude: Float
    longitude: Float
    locType: String
  }
`;
