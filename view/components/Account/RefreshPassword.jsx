import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import {
  Button, Form, Grid, Header, Segment,
} from 'semantic-ui-react';
import gql from 'graphql-tag';
import ErrorMessage from '../Error';

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
      const isInvalid = previousPassword === '' || newPassword === '';

      return (
        <Mutation mutation={REFRESH_PASSWORD} variables={{ id: localStorage.getItem('uId'), previousPassword, newPassword }}>
          {(refresh, { data, loading, error }) => (
            <div style={{
              width: '90%', margin: 'auto', textAlign: 'center', marginTop: '50px',
            }}
            >
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

export default RefreshPassword;
