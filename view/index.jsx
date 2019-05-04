/* global document */
import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { getMainDefinition } from 'apollo-utilities';
import { ApolloLink, split, execute } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { HttpLink } from 'apollo-link-http';
// import { WebSocketLink } from 'apollo-link-ws';
import { onError } from 'apollo-link-error';
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from 'graphql-tag';
import { createUploadLink } from 'apollo-upload-client';
import App from './components/index';
import { signOut } from './components/Account/SignOut/index';
import './index.css';

const uploadLink = createUploadLink({
  uri: 'http://localhost:5000/graphql',
});

const httpLink = new HttpLink({
  uri: 'http://localhost:5000/graphql',
});

// const wsLink = new WebSocketLink({
//   uri: 'ws://localhost:5000/graphql',
//   options: {
//     reconnect: true,
//   },
// });

const terminatingLink = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return (
      kind === 'OperationDefinition' && operation === 'subscription'
    );
  },
  // wsLink,
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
      switch (message) {
        case 'NOT_AUTHENTICATED':
          signOut(client);
          break;
        case 'Context creation failed: TokenExpiredError: jwt expired':
          const operation = {
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
            error: error => console.log(`JWT refresh error: ${error}`),
            complete: () => console.log('JWT has been refreshed!'),
          });
          break;
        default:
          console.log('GraphQL error', message);
      }
    });
  }

  if (networkError) {
    console.log('Network error', networkError);

    if (networkError.statusCode === 401) {
      signOut(client);
    }
  }
});
4
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
