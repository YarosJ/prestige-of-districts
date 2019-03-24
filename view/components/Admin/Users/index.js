import React, { Component, Fragment } from 'react';
import {Mutation, Query} from 'react-apollo';
import gql from "graphql-tag";
import DeleteUser from './DeleteUser';
import SelectRole from './SelectRole';
import Loading from '../../Loading/index';
import {Icon, Table} from 'semantic-ui-react';
import { GET_USERS } from '../constants/queries';
import checkPermission from "../helpers/checkPermission";
import pagination, {changePagination} from "../../../helpers/pagination";
import scrollIntoView from "scroll-into-view";
import Pagination from "./Pagination";
import ReactDOM from "react-dom";

const UPDATE_USER = gql`
  mutation($id: ID!, $role: String) {
    updateUser(id: $id, role: $role) {
      id
      email
      role
      cart {
        id
        title
        body
        price
      }
    }
  }
`;

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
    scrollIntoView(ReactDOM.findDOMNode(document.getElementById('top-scroll')));
    this.setState({ cursor: changePagination(activePage) });
  };

  render() {
    const { cursor, limit } = this.state;
    const { history } = this.props;

    checkPermission(history);

    return (
      <Query
        query={GET_USERS}
        variables={{ limit, cursor }}
      >
        {({
          data, loading, error, fetchMore, subscribeToMore,
        }) => {
          const { users } = data;
          if (loading || !users) {
            return <Loading />;
          }

          return (
            <Fragment>
              <UsersList
                users={users}
                subscribeToMore={subscribeToMore}
                limit={limit}
                cursor={cursor}
              />
              <Pagination
                cursor={cursor}
                limit={limit}
                onPageChange={this.handlePaginationChange}
              />
            </Fragment>
          );
        }}
      </Query>
    );
  }
}

class UsersList extends Component {
  render() {
    const { users, limit, cursor } = this.props;
    return (
      <Table striped style={{ width: '98%', margin: 'auto' }}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>Role</Table.HeaderCell>
            <Table.HeaderCell style={{ textAlign: 'center' }}>Cart Length</Table.HeaderCell>
            <Table.HeaderCell style={{ textAlign: 'center' }}>Delete user</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {users.map((user, key) => (
            <UserItem user={user} limit={limit} cursor={cursor} key={key} />
          ))}
        </Table.Body>
      </Table>
    )
  }
}

class UserItem extends Component {
  state = {
    id: '',
    role: '',
  };

  async update(id, update, role) {
    await this.setState({ id, role });
    update();
  }

  render() {
    const { id, role } = this.state;
    const { user, limit, cursor } = this.props;
    return (
      <Mutation
        mutation={UPDATE_USER}
        variables={{ id, role }}
        update={
          (proxy, {data: {updateUser}}) => {
            const variables = limit ? {limit, cursor} : {cursor};
            const data = proxy.readQuery({query: GET_USERS, variables});
            data.users = data.users.map(u => {
              if (u.id === updateUser.id) u.role = updateUser.role;
              return u;
            });
            proxy.writeQuery({query: GET_USERS, variables, data});
          }
        }
      >
        {(updateUser, {data, loading, error}) => (
          <Table.Row>
            <Table.Cell>{user.email}</Table.Cell>
            <Table.Cell>
              <SelectRole value={user.role} updateUser={this.update.bind(this, user.id, updateUser)}/>
            </Table.Cell>
            <Table.Cell style={{ textAlign: 'center' }}>{user.cart.length}</Table.Cell>
            <Table.Cell style={{ textAlign: 'center' }}>
              <DeleteUser user={user} limit={limit} cursor={cursor}>
                <Icon name='cancel' size='large'/>
              </DeleteUser>
            </Table.Cell>
          </Table.Row>
        )}
      </Mutation>
    )
  }
};

export default Users;
