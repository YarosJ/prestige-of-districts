/* eslint-disable no-underscore-dangle */
import React from 'react';
import { Query } from 'react-apollo';
import {
  Divider, Container, Segment, Label, Icon,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { GET_FAILURE } from '../../constants/queries';
import Loading from '../Loading/index';
import Footer from '../Footer/index';
import ChooseService from '../../helpers/ChooseService';

class Messages extends React.Component {
  state = { services: [] };

  handleServiceChange = (e, { value }) => this.setState({ services: value });

  render() {
    const { services } = this.state;

    return (
      <Query query={GET_FAILURE} variables={{ services }}>
        {({ data, loading }) => {
          const { failures } = data;
          if (loading || !failures) {
            return <Loading />;
          }

          return (
            <div style={{
              height: '100%',
              width: '100%',
              overflow: 'auto',
              background: '#1a1c1d',
            }}
            >
              <ChooseService handleChange={this.handleServiceChange} value={services} />
              <Segment inverted>
                {failures.map(f => (
                  <Container textAlign="justified" key={f.id} style={{ fontFamily: '"Exo 2", sans-serif' }}>
                    <Label as="a" color="red" ribbon>
                      { f.service }
                    </Label>
                    <p>{ f.text }</p>
                    <Label as="a" color="teal">
                      <Icon name="calendar alternate" />
                      { new Date(f.happenedAt).toDateString() }
                    </Label>
                    <Divider section />
                  </Container>
                ))}
                <Container textAlign="justified">
                  <Footer />
                </Container>
              </Segment>
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
