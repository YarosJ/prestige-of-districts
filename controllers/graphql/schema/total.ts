import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    total(target: String): Total
  }

   type Total {
    count: String
  }
`;
