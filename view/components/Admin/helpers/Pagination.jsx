import React from 'react';
import { Query } from 'react-apollo';
import { Container, Pagination } from 'semantic-ui-react';
import { GET_TOTAL } from '../../../constants/queries';

export default ({ cursor, limit, onPageChange }) => (
  <Query
    query={GET_TOTAL}
    variables={{ target: 'Users' }}
  >
    {({
      data, loading, error,
    }) => {
      const { total } = data;
      let count = limit;
      if (total) count = total.count;

      return (
        <Container style={{
          textAlign: 'center',
          marginTop: '30px',
        }}
        >
          <Pagination
            inverted
            activePage={cursor}
            onPageChange={onPageChange}
            totalPages={Math.ceil(count / limit)}
          />
        </Container>
      );
    }}
  </Query>
);
