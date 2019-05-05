import React from 'react';
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

const DeleteRoleAction = ({ role, action, children }) => (
  <Mutation
    mutation={DELETE_ROLE_ACTION}
    variables={{ role: role.role, action }}
    optimisticResponse={
      {
        deleteAction: {
          role: role.role,
          actions: role.actions.filter(item => action !== item),
          __typename: 'Permission',
        },
      }
    }
    update={
      (proxy, { data: { deleteAction } }) => {
        const data = proxy.readQuery({ query: GET_ROLES });

        data.roles.map((r) => {
          if (r.role === deleteAction.role) {
            r.actions = deleteAction.actions;
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
        {children}
        {error && <ErrorMessage error={error} />}
      </div>
    )}
  </Mutation>
);

export default DeleteRoleAction;
