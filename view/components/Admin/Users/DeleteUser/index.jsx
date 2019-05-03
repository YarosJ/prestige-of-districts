import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { GET_USERS } from '../../constants/queries';
import confirmDialog from '../../../../helpers/confirmDialog';
import ErrorMessage from '../../../Error';

const DELETE_USER = gql`
  mutation($id: ID!) {
    deleteUser(id: $id)
  }
`;

const UserDelete = ({ user, limit, cursor, children }) => (
  <Mutation
    mutation={DELETE_USER}
    variables={{ id: user.id }}
    update={(cache) => {
      const data = cache.readQuery({
        query: GET_USERS,
        variables: { limit, cursor },
      });

      const updatedUsers = data.users.filter(userItem => userItem.id !== user.id);

      cache.writeQuery({
        query: GET_USERS,
        variables: { limit, cursor },
        data: {
          ...data,
          users: updatedUsers,
        },
      });
    }}
  >
    {(deleteUser, { error }) => (
      <div onClick={async () => {
        await confirmDialog({ action: 'user', onConfirm: deleteUser });
      }}>
        {children}
        { error && <ErrorMessage error={error} /> }
      </div>
    )}
  </Mutation>
);

export default UserDelete;
