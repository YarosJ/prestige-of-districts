/* global document, localStorage */
import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { getMainDefinition } from 'apollo-utilities';
import { ApolloLink, split, execute } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from 'graphql-tag';
import { createUploadLink } from 'apollo-upload-client';
import App from './components/index';
import { signOut } from './components/Account/SignOut/index';
import config from './config.json';
import './index.css';

const uploadLink = createUploadLink({
  uri: config.uploadLink,
});

const httpLink = new HttpLink({
  uri: config.httpLink,
});

const terminatingLink = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return (
      kind === 'OperationDefinition' && operation === 'subscription'
    );
  },
  uploadLink,
  httpLink,
);

/**
 * Get the authentication token from local storage if it exists
 * and return the headers to the context so httpLink can read them
 * @type {ApolloLink}
 */

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('accessToken');
  return {
    headers: {
      ...headers,
      authorization: token || '', // token ? `Bearer ${token}` : ''
    },
  };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message }) => {
      let operation;
      switch (message) {
        case 'NOT_AUTHENTICATED':
          signOut(client);
          break;
        case 'Context creation failed: TokenExpiredError: jwt expired':
          operation = {
            query: gql`
            mutation($refreshToken: String!) {
              refreshToken(refreshToken: $refreshToken) {
                accessToken
              }
            }`,
            variables: { refreshToken: localStorage.getItem('refreshToken') },
          };

          execute(httpLink, operation).subscribe({
            next: result => localStorage.setItem('accessToken', result.data.refreshToken.accessToken),
            error: error => console.info(`JWT refresh error: ${error}`),
            complete: () => console.info('JWT has been refreshed!'),
          });
          break;
        default:
          console.error('GraphQL error', message);
      }
    });
  }

  if (networkError) {
    console.error('Network error', networkError);

    if (networkError.statusCode === 401) {
      signOut(client);
    }
  }
});

const client = new ApolloClient({
  link: ApolloLink.from([authLink, errorLink, terminatingLink]),
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App apolloClient={client} />
  </ApolloProvider>,
  document.getElementById('root'),
);
