import React from 'react';
import { ApolloConsumer } from 'react-apollo';
import { childrenPropType } from '../../../constants/propTypes';
import localStorageSet from '../../../helpers/localStorageSet';
import { routes } from '../../../config.json';
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
  children: childrenPropType,
};

SignOutButton.defaultProps = {
  children: null,
};

export { signOut };
export default SignOutButton;
