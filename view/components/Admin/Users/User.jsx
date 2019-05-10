import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { Icon, Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { GET_USERS } from '../constants/queries';
import SelectRole from './SelectRole';
import DeleteUser from './DeleteUser';

const UPDATE_USER = gql`
  mutation($id: ID!, $role: String) {
    updateUser(id: $id, role: $role) {
      id
      email
      role
    }
  }
`;

class User extends Component {
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
          (cache, { data: { updateUser } }) => {
            const variables = limit ? { limit, cursor } : { cursor };
            const data = cache.readQuery({ query: GET_USERS, variables });

            data.users = data.users.map((u) => {
              if (u.id === updateUser.id) return { ...u, role: updateUser.role };
              return u;
            });

            cache.writeQuery({ query: GET_USERS, variables, data });
          }
        }
      >
        {updateUser => (
          <Table.Row>
            <Table.Cell>{user.email}</Table.Cell>
            <Table.Cell>
              <SelectRole
                value={user.role}
                updateUser={r => this.update(user.id, updateUser, r)}
              />
            </Table.Cell>
            <Table.Cell style={{ textAlign: 'center' }}>
              <DeleteUser user={user} limit={limit} cursor={cursor}>
                <Icon name="cancel" size="large" />
              </DeleteUser>
            </Table.Cell>
          </Table.Row>
        )}
      </Mutation>
    );
  }
}

User.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string,
    role: PropTypes.string,
    id: PropTypes.string,
  }),
  limit: PropTypes.number,
  cursor: PropTypes.number,
};

User.defaultProps = {
  user: null,
  limit: 15,
  cursor: 0,
};

export default User;
