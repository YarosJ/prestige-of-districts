import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import ErrorMessage from '../../../Error/index';
import confirmDialog from '../../../../helpers/confirmDialog';
import { rolePropType, childrenPropType } from '../../../../constants/propTypes';

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

const confirm = async (deleteRole) => {
  await confirmDialog({ action: 'role', onConfirm: deleteRole });
};

const DeleteRole = ({ role, children }) => (
  <Mutation
    mutation={DELETE_ROLE}
    variables={{ role: role.role }}
    optimisticResponse={
      {
        deleteRole: {
          role: role.role,
          actions: role.actions,
          __typename: 'Permission',
        },
      }
    }
    update={
      (proxy, { data: { deleteRole } }) => {
        const data = proxy.readQuery({ query: GET_ROLES });
        data.roles = data.roles.filter(r => r.role !== deleteRole.role);
        proxy.writeQuery({
          query: GET_ROLES,
          data,
        });
      }
    }
  >
    {(deleteRole, { error }) => (
      <div
        role="button"
        tabIndex="-1"
        onClick={async () => confirm(deleteRole)}
        onKeyPress={async () => confirm(deleteRole)}
      >
        {children}
        {error && <ErrorMessage error={error} />}
      </div>
    )}
  </Mutation>
);

DeleteRole.propTypes = {
  role: rolePropType,
  children: childrenPropType,
};

DeleteRole.defaultProps = {
  role: {
    role: null,
    actions: [],
  },
  children: null,
};

export default DeleteRole;
