import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import ErrorMessage from '../../../Error/index';
import { rolePropType, childrenPropType } from '../../../../constants/propTypes';

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
      (cache, { data: { deleteAction } }) => {
        const data = cache.readQuery({ query: GET_ROLES });

        data.roles.forEach((r, index) => {
          if (r.role === deleteAction.role) {
            data.roles[index].actions = deleteAction.actions;
          }
        });

        cache.writeQuery({
          query: GET_ROLES,
          data,
        });
      }
    }
  >
    {(deleteAction, { error }) => (
      <div
        role="button"
        tabIndex="-1"
        onClick={deleteAction}
        onKeyPress={deleteAction}
      >
        {children}
        {error && <ErrorMessage error={error} />}
      </div>
    )}
  </Mutation>
);

DeleteRoleAction.propTypes = {
  role: rolePropType,
  action: PropTypes.string,
  children: childrenPropType,
};

DeleteRoleAction.defaultProps = {
  role: {
    role: null,
    actions: [],
  },
  action: null,
  children: null,
};

export default DeleteRoleAction;
