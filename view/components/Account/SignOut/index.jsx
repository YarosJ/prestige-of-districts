import React from 'react';
import { ApolloConsumer } from 'react-apollo';
import PropTypes from 'prop-types';
import localStorageSet from '../../../helpers/localStorageSet';
import * as routes from '../../../constants/routes';
import history from '../../../constants/history';

const signOut = async (client) => {
  await localStorageSet([
    { key: 'accessToken', value: '' },
    { key: 'refreshToken', value: '' },
    { key: 'role', value: '' },
    { key: 'uId', value: '' },
  ]);

  if (client) await client.clearStore();
  history.push(routes.LANDING);
};

const SignOutButton = ({ children }) => (
  <ApolloConsumer>
    {client => (
      <div
        role="button"
        tabIndex="-1"
        onClick={() => signOut(client)}
        onKeyPress={() => signOut(client)}
      >
        {children}
        Sign Out
      </div>
    )}
  </ApolloConsumer>
);

SignOutButton.propTypes = {
  children: PropTypes.element.isRequired,
};

export { signOut };
export default SignOutButton;
