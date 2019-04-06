import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { Pagination, Container } from 'semantic-ui-react';
import { GET_TOTAL } from '../../../constants/queries';

class Pgn extends Component {
  render() {
    const { cursor, limit, onPageChange } = this.props;

    return (
      <Query
        query={GET_TOTAL}
        variables={{ target: 'Users' }}
      >
        {({
          data, loading, error,
        }) => {
          const total = data.total;
          let count = limit;
          if (total) count = total.count;

          return (
            <Container style={{ textAlign: 'center', marginTop: '30px' }}>
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
  }
}

export default Pgn;
