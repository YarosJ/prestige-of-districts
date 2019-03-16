import { gql } from 'apollo-server-express';

export default gql`
  input RangeInput {
    maxLatitude: Int
    minLatitude: Int
    maxLongitude: Int
    minLongitude: Int
  }
`;
