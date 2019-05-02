/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import React, { Component } from 'react';
import { Query, ApolloConsumer } from 'react-apollo';
import { GET_SCREENSHOT, GET_SELECTOR } from '../../constants/queries';
import Loading from '../../../Loading/index';

class GetSelector extends Component {
  state = {};

  async componentDidUpdate() {
    const { URL, onGetSelector, editKey } = this.props;
    const { x, y, client } = this.state;
    if (x || y) {
      const response = await client.query({
        query: GET_SELECTOR,
        variables: { URL, x, y },
      });
      onGetSelector(response.data.selector.resultSelector, editKey);
    }
  }

  render() {
    const { x, y } = this.state;
    const { URL } = this.props;

    return (
      <Query
        query={GET_SCREENSHOT}
        variables={{ URL }}
      >
        {({
          data, loading, error,
        }) => {
          const { screenshot } = data;
          if (loading || error || !screenshot || x || y) {
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
                    this.setState({
                      x: e.pageX, y: e.pageY, client,
                    });
                  }}
                />
              )}
            </ApolloConsumer>
          );
        }}
      </Query>
    );
  }
}

export default GetSelector;
