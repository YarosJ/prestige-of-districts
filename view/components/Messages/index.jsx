/* eslint-disable no-underscore-dangle */
import React from 'react';
import { Query } from 'react-apollo';
import {
  Header, Divider, Container, Segment, Label, Icon,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { GET_MESSAGES } from '../../constants/queries';
import Loading from '../Loading/index';
import Footer from '../Footer/index';

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
              height: '100%',
              width: '100%',
              overflow: 'auto',
            }}
            >
              <Segment>
                <Header as='h2'>
                  <Icon name='settings' />
                  <Header.Content>
                    Account Settings
                    <Header.Subheader>Manage your preferences</Header.Subheader>
                  </Header.Content>
                </Header>
                {messages.map(m => (
                  <Container textAlign="justified" key={m.id} style={{ fontFamily: '"Exo 2", sans-serif' }}>
                    <Label as="a" color="red" ribbon>
                      { m.service }
                    </Label>
                    <p>{ m.text }</p>
                    <Label as="a" color="teal">
                      <Icon name="calendar alternate" />
                      { new Date(m.happenedAt).toDateString() }
                    </Label>
                    <Divider section />
                  </Container>
                ))}
              </Segment>
              <Container textAlign="justified">
                <Footer />
              </Container>
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
