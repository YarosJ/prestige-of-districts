import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import ErrorMessage from '../../../Error/index';

const DELETE_ROLE_ACTION = gql`
  mutation($role: String!, $action: String!) {
    deleteAction(role: $role, action: $action) {
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

class DeleteRoleAction extends Component {
  render() {
    return (
      <Mutation
        mutation={DELETE_ROLE_ACTION}
        variables={{ role: this.props.role.role, action: this.props.action }}
        optimisticResponse={
          {
            deleteAction: {
              role: this.props.role.role,
              actions: this.props.role.actions.filter(item => this.props.action !== item),
              __typename: 'Permission',
            },
          }
        }
        update={
          (proxy, { data: { deleteAction } }) => {
            const data = proxy.readQuery({ query: GET_ROLES });

            data.roles.map((role) => {
              if (role.role === deleteAction.role) {
                role.actions = deleteAction.actions;
              }
            });

            proxy.writeQuery({
              query: GET_ROLES,
              data,
            });
          }
        }
      >
        {(deleteAction, { data, loading, error }) => (
          <div onClick={deleteAction}>
            { this.props.children }
            { error && <ErrorMessage error={error} /> }
          </div>
        )}
      </Mutation>
    );
  }
}

export default DeleteRoleAction;
