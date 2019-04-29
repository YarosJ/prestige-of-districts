import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import ErrorMessage from '../../../Error/index';

const DELETE_ROLE = gql`
  mutation($role: String!) {
    deleteRole(role: $role) {
      role
      actions
    }
  }
`;

const GET_ROLES = gql`
 query {
     roles {
      role
      actions
    }
  }
`;

class DeleteRole extends Component {
  render() {
    return (
      <Mutation
        mutation={DELETE_ROLE}
        variables={{ role: this.props.role.role }}
        optimisticResponse={
          {
            deleteRole: {
              role: this.props.role.role,
              actions: this.props.role.actions,
              __typename: 'Permission',
            },
          }
        }
        update={
          (proxy, { data: { deleteRole } }) => {
            const data = proxy.readQuery({ query: GET_ROLES });
            data.roles = data.roles.filter((role) => role.role !== deleteRole.role);
            proxy.writeQuery({
              query: GET_ROLES,
              data,
            });
          }
        }
      >
        {(deleteRole, { data, loading, error }) => (
          <div onClick={deleteRole}>
            { this.props.children }
            { error && <ErrorMessage error={error} /> }
          </div>
        )}
      </Mutation>
    );
  }
}

export default DeleteRole;
