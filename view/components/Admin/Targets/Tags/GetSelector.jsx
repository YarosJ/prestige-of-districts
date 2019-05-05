/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logger from 'loglevel';
import { Query, ApolloConsumer, ApolloProvider } from 'react-apollo';
import { GET_SCREENSHOT, GET_SELECTOR } from '../../constants/queries';
import Loading from '../../../Loading/index';

class GetSelector extends Component {
  state = {};

  async componentDidUpdate() {
    const { URL, onGetSelector, editKey } = this.props;
    const { x, y, client } = this.state;
    if (x || y) {
      try {
        const response = await client.query({
          query: GET_SELECTOR,
          variables: { URL, x, y },
        });
        onGetSelector(response.data.selector.resultSelector, editKey);
      } catch (e) {
        logger.error(e);
      }
      // eslint-disable-next-line react/no-find-dom-node
      ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(this).parentNode);
    }
  }

  render() {
    const { x, y } = this.state;
    const { URL, apolloClient } = this.props;

    return (
      <ApolloProvider client={apolloClient}>
        <Query
          query={GET_SCREENSHOT}
          variables={{ URL }}
        >
          {({
            data, loading, error,
          }) => {
            const { screenshot } = data;

            if (error) ReactDOM.unmountComponentAtNode(this.node.parentNode);
            if (loading || !screenshot || x || y) {
              return (
                <div style={{
                  width: '100%',
                  height: '100%',
                  position: 'fixed',
                  background: 'orange',
                }}
                >
                  <Loading />
                </div>
              );
            }

            const { resultData } = screenshot;

            return (
              <ApolloConsumer>
                {client => (
                  <img
                    style={{ margin: 'auto' }}
                    src={`data:image/jpeg;base64,${resultData}`}
                    alt="Error"
                    onClick={async (e) => {
                      e.persist();
                      this.setState({
                        x: e.pageX - e.target.offsetLeft,
                        y: e.pageY - e.target.offsetTop,
                        client,
                      });
                    }}
                  />
                )}
              </ApolloConsumer>
            );
          }}
        </Query>
      </ApolloProvider>
    );
  }
}

export default GetSelector;
