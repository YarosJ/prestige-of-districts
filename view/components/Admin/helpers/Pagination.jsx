import React from 'react';
import { Query } from 'react-apollo';
import { Container, Pagination } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { GET_TOTAL } from '../../../constants/queries';

const PaginationComponent = ({ cursor, limit, onPageChange }) => (
  <Query
    query={GET_TOTAL}
    variables={{ target: 'Users' }}
  >
    {({ data }) => {
      const { total } = data;
      let count = limit;
      if (total) ({ count } = total);

      return (
        <Container style={{
          textAlign: 'center',
          marginTop: '30px',
        }}
        >
          <Pagination
            activePage={cursor}
            onPageChange={onPageChange}
            totalPages={Math.ceil(count / limit)}
          />
        </Container>
      );
    }}
  </Query>
);

PaginationComponent.propTypes = {
  cursor: PropTypes.number,
  limit: PropTypes.number,
  onPageChange: PropTypes.func,
};

PaginationComponent.defaultProps = {
  cursor: 0,
  limit: 15,
  onPageChange: null,
};

export default PaginationComponent;
