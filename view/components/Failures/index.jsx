/* eslint-disable no-underscore-dangle */
import React from 'react';
import { Query } from 'react-apollo';
import {
  Divider, Container, Segment, Label, Icon, Header,
} from 'semantic-ui-react';
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
                  <Icon name="bullhorn" />
                  <Header.Content>
                    Failures
                    <Header.Subheader>
                      Choose service to watch failures from the last week here
                    </Header.Subheader>
                  </Header.Content>
                </Header>
                <ChooseService
                  handleChange={this.handleServiceChange}
                  value={services}
                  style={{
                    transform: 'translateX(-48%)',
                    left: '51%',
                    marginTop: '20px',
                    marginBottom: '20px',
                  }}
                />
                {failures.map(f => (
                  <div key={f.id}>
                    <Label as="a" color="red" ribbon>
                      { f.service }
                    </Label>
                    <p>{ f.text }</p>
                    <Label as="a" color="teal">
                      <Icon name="calendar alternate" />
                      { new Date(f.happenedAt).toDateString() }
                    </Label>
                    <Divider section />
                  </div>
                ))}
                <Footer />
              </Container>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default Messages;
