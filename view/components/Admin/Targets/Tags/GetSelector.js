import React from 'react';
import { Query, ApolloConsumer } from 'react-apollo';
import { GET_SCREENSHOT, GET_SELECTOR } from '../../constants/queries';
import Loading from '../../../Loading/index';

export default ({ URL, onGetSelector, payload1 }) => (
  <Query
    query={GET_SCREENSHOT}
    variables={{ URL }}
  >
    {({
      data, loading, error,
    }) => {
      const { screenshot } = data;
      if (loading || error || !screenshot) {
        return <Loading />;
      }
      const { resultData } = screenshot;

      return (
        <ApolloConsumer>
          {client => (
            <img
              style={{ width: '100%' }}
              src={`data:image/jpeg;base64,${resultData}`}
              alt="Error"
              onClick={async (e) => {
                const response = await client.query({
                  query: GET_SELECTOR,
                  variables: { URL, x: e.pageX, y: e.pageY },
                });
                const { fields, key } = payload1;
                fields[key] = response.data.selector.resultSelector;
                onGetSelector({ fields, key });
              }}
            />
          )}
        </ApolloConsumer>
      );
    }}
  </Query>
);
