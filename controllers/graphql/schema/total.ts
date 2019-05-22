import { gql } from 'apollo-server-express';

/**
 * Schema definition for total
 */

export default gql`
  extend type Query {
    total(target: String): Total
  }

   type Total {
    count: String
  }
`;
