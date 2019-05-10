/* global document */

import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { Container } from 'semantic-ui-react';
import scrollIntoView from 'scroll-into-view';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Loading from '../../Loading/index';
import { GET_USERS } from '../constants/queries';
import checkPermission from '../../../helpers/checkPermission';
import pagination, { changePagination } from '../../../helpers/pagination';
import UsersList from './UsersList';
import Pagination from '../helpers/Pagination';
import Footer from '../../Footer/index';

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cursor: 1,
      limit: pagination().limit,
    };

    this.handlePaginationChange = this.handlePaginationChange.bind(this);
  }

  handlePaginationChange = (e, { activePage }) => {
    // eslint-disable-next-line react/no-find-dom-node
    scrollIntoView(ReactDOM.findDOMNode(document.getElementById('top-scroll')));
    this.setState({ cursor: changePagination(activePage) });
  };

  render() {
    const { cursor, limit } = this.state;
    const { history } = this.props;

    checkPermission({ history, redirect: true });

    return (
      <Query
        query={GET_USERS}
        variables={{ limit, cursor }}
      >
        {({ data, loading }) => {
          const { users } = data;

          if (loading || !users) {
            return <Loading />;
          }

          return (
            <div style={{
              height: '100%',
              width: '100%',
              overflow: 'auto',
            }}
            >
              <UsersList
                users={users}
                limit={limit}
                cursor={cursor}
              />
              <Pagination
                cursor={cursor}
                limit={limit}
                onPageChange={this.handlePaginationChange}
              />
              <Container text textAlign="justified">
                <Footer />
              </Container>
            </div>
          );
        }}
      </Query>
    );
  }
}

Users.propTypes = {
  history: PropTypes.objectOf(PropTypes.any),
};

Users.defaultProps = {
  history: {},
};

export default Users;
