import React, { Component, Fragment } from 'react';
import { Mutation, Query } from 'react-apollo';
import {
  Button, Form, Grid, Header, Icon, Segment,
} from 'semantic-ui-react';
import gql from 'graphql-tag';
import { GET_USER } from '../../../constants/queries';
import Loading from '../../Loading';
import ErrorMessage from '../../Error';

const REFRESH_PASSWORD = gql`
  mutation($id: ID!, $previousPassword: String!, $newPassword: String!) {
    updateUser(id: $id, previousPassword: $previousPassword, newPassword: $newPassword) {
      id
      role
    }
  }
`;

const INITIAL_STATE = {
  previousPassword: '',
  newPassword: '',
};

class Profile extends Component {
  render() {
    return (
      <Query
        query={GET_USER}
        variables={{ id: localStorage.getItem('uId') }}
      >
        {({
          data, loading, error,
        }) => {
          const { user } = data;
          if (loading || !user) {
            return <Loading />;
          }

          return (
            <Fragment>
              <RefreshPassword me={user} />
            </Fragment>
          );
        }}
      </Query>
    );
  }
}

class RefreshPassword extends Component {
  state = { ...INITIAL_STATE };

  onChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  onSubmit = (event, refresh) => {
    refresh();
    event.preventDefault();
  };

  render() {
    const { previousPassword, newPassword } = this.state;
    const { me } = this.props;

    const isInvalid = previousPassword === '' || newPassword === '';

    return (
      <Mutation mutation={REFRESH_PASSWORD} variables={{ id: localStorage.getItem('uId'), previousPassword, newPassword }}>
        {(refresh, { data, loading, error }) => (
          <div style={{
            width: '90%', margin: 'auto', textAlign: 'center', marginTop: '50px',
          }}
          >
            <Grid columns={3} style={{ color: "teal" }}>
              <Grid.Row>
                <Grid.Column>
                  <Icon name="envelope outline" />
                  { me.email }
                </Grid.Column>
                <Grid.Column>
                  <Icon name="user outline" />
                  { me.role }
                </Grid.Column>
                <Grid.Column>
                  <Icon name="clock outline" />
                  { new Date(me.createdAt).toLocaleDateString() }
                </Grid.Column>
              </Grid.Row>
            </Grid>

            <Grid textAlign="center" style={{ marginTop: '30px', marginBottom: '50px' }} verticalAlign="middle">
              <Grid.Column style={{ maxWidth: 450 }}>
                <Header as="h2" color="teal" textAlign="center">
                  Change password:
                </Header>
                <Form size="large" onSubmit={event => this.onSubmit(event, refresh)}>
                  <Segment stacked>
                    <Form.Input
                      fluid
                      icon="lock"
                      iconPosition="left"
                      type="password"
                      name="previousPassword"
                      value={previousPassword}
                      onChange={this.onChange}
                      placeholder="Previous password"
                    />
                    <Form.Input
                      fluid
                      icon="lock"
                      iconPosition="left"
                      type="password"
                      name="newPassword"
                      value={newPassword}
                      onChange={this.onChange}
                      placeholder="New password"
                    />
                    <Button
                      color="teal"
                      fluid
                      size="large"
                      disabled={isInvalid || loading}
                      type="submit"
                    >
                      Refresh Password
                    </Button>
                  </Segment>
                </Form>
                {error && <ErrorMessage error={error} />}
              </Grid.Column>
            </Grid>
          </div>
        )}
      </Mutation>
    );
  }
}

export default Profile;
