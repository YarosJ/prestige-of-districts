import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { GET_USERS } from '../../queries';
import confirmDialog from '../../../../helpers/confirmDialog';
import ErrorMessage from '../../../Error';
import { childrenPropType } from '../../../../constants/propTypes';

const DELETE_USER = gql`
  mutation($id: ID!) {
    deleteUser(id: $id)
  }
`;

const confirmAndDelete = async (deleteUser) => {
  await confirmDialog({ action: 'user.ts', onConfirm: deleteUser });
};

const UserDelete = ({
  user, limit, cursor, children,
}) => (
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
      <div
        role="button"
        tabIndex="-1"
        onClick={() => confirmAndDelete(deleteUser)}
        onKeyPress={() => confirmAndDelete(deleteUser)}
      >
        {children}
        { error && <ErrorMessage error={error} /> }
      </div>
    )}
  </Mutation>
);

UserDelete.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string,
    role: PropTypes.string,
    id: PropTypes.string,
  }),
  limit: PropTypes.number,
  cursor: PropTypes.number,
  children: childrenPropType,
};

UserDelete.defaultProps = {
  user: null,
  limit: 15,
  cursor: 0,
  children: null,
};

export default UserDelete;
