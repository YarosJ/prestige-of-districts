/* eslint-disable no-underscore-dangle */
import React from 'react';
import { Query } from 'react-apollo';
import { Header, Divider, Container } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { GET_MESSAGES } from '../../constants/queries';
import Loading from '../Loading';
import Navigation from '../Landing/Navigation';

class Messages extends React.Component {
  render() {
    const { history } = this.props;

    return (
      <Query query={GET_MESSAGES}>
        {({ data, loading }) => {
          const { messages } = data;
          if (loading || !messages) {
            return <Loading />;
          }

          return (
            <div style={{
              display: 'flex',
              padding: 0,
              height: '104.5%',
            }}
            >
              <Navigation history={history} />
              <div style={{
                height: '100%',
                width: '100%',
                overflow: 'auto',
                background: 'white',
              }}
              >
                {messages.map(m => (
                  <Container text textAlign="justified" key={m.id}>
                    <Header as="h3">{ m.service }</Header>
                    <p>{ m.text }</p>
                    <Divider section />
                  </Container>
                ))}
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

Messages.propTypes = {
  history: PropTypes.objectOf(PropTypes.any),
};

Messages.defaultProps = {
  history: {},
};

export default Messages;
