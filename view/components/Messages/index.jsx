/* eslint-disable no-underscore-dangle */
import React from 'react';
import { Query } from 'react-apollo';
import moment from 'moment';
import {
  Container, Divider, Header, Icon, Label,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { GET_MESSAGES } from '../../constants/queries';
import Loading from '../Loading/index';
import Footer from '../Footer/index';

const Messages = ({ history }) => (
  <Query
    query={GET_MESSAGES}
    variables={{
      dateRange: {
        maxDate: moment(),
        minDate: moment().subtract(1, 'months'),
      },
    }}
  >
    {({ data, loading }) => {
      const { messages } = data;
      if (loading || !messages) {
        return <Loading />;
      }

      return (
        <div style={{
          height: '100%',
          width: '100%',
        }}
        >
          <Container
            textAlign="justified"
            style={{
              fontFamily: '"Exo 2", sans-serif',
              padding: '19px',
            }}
          >
            <Header
              color="blue"
              as="h2"
              style={{
                marginBottom: '35px',
                marginTop: '10px',
              }}
            >
              <Icon name="bell outline" />
              <Header.Content>
                  Messages
                <Header.Subheader>
                    All messages from the last week are shown here
                </Header.Subheader>
              </Header.Content>
            </Header>
            {messages.map(m => (
              <div key={m.id}>
                <Label as="a" color="red" ribbon>
                  {m.service}
                </Label>
                <p>{m.text}</p>
                <Label as="a" color="teal">
                  <Icon name="calendar alternate" />
                  {new Date(m.happenedAt).toDateString()}
                </Label>
                <Divider section />
              </div>
            ))}
            <Footer style={{ marginTop: '-40px' }} />
          </Container>
        </div>
      );
    }}
  </Query>
);

Messages.propTypes = {
  history: PropTypes.objectOf(PropTypes.any),
};

Messages.defaultProps = {
  history: {},
};

export default Messages;
