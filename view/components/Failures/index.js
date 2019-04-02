/* eslint-disable no-underscore-dangle */
import React from 'react';
import { Query } from 'react-apollo';
import { Header, Divider, Container } from 'semantic-ui-react';
import { GET_FAILURE } from '../../constants/queries';
import Loading from '../Loading';
import Navigation from '../Landing/Navigation';
import PropTypes from 'prop-types';

class Messages extends React.Component {
  render() {
    const { history } = this.props;

    return (
      <Query query={GET_FAILURE}>
        {({ data, loading }) => {
          const { failures } = data;
          if (loading || !failures) {
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
                {failures.map(f => (
                  <Container text textAlign='justified' key={f.id}>
                    <Header as="h3">{ f.service }</Header>
                    <p>{ f.text }</p>
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
