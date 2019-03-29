import React from 'react';
import { ApolloConsumer } from 'react-apollo';
import PropTypes from 'prop-types';
import * as routes from '../../../constants/routes';
import history from '../../../constants/history';

const signOut = async (client) => {
  localStorage.setItem('accessToken', '');
  localStorage.setItem('refreshToken', '');
  localStorage.setItem('role', '');
  await localStorage.setItem('uId', '');
  client.resetStore();
  history.push(routes.LANDING);
};

const SignOutButton = ({ children }) => (
  <ApolloConsumer>
    {client => (
      <div onClick={() => signOut(client)}>
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
