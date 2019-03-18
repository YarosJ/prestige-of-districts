import { gql } from 'apollo-server-express';

export default gql`
  input RangeInput {
    maxLatitude: Float
    minLatitude: Float
    maxLongitude: Float
    minLongitude: Float
  }

  type Location {
    latitude: Float
    longitude: Float
  }
`;
