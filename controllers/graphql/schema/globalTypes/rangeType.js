import { gql } from 'apollo-server-express';

export default gql`
  type Range {
    maxLatitude: Int
    minLatitude: Int
    maxLongitude: Int
    minLongitude: Int
  }
`;
