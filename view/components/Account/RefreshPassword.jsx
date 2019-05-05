/* global localStorage */

import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import {
  Button, Form,
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
          {(refresh, { loading, error }) => (
            <div style={{
              width: '100%', margin: 'auto', textAlign: 'center',
            }}
            >
              <Form size="large" onSubmit={event => this.onSubmit(event, refresh)}>
                <Form.Input
                  icon="lock"
                  iconPosition="left"
                  type="password"
                  name="previousPassword"
                  value={previousPassword}
                  onChange={this.onChange}
                  placeholder="Previous password"
                />
                <Form.Input
                  icon="lock"
                  iconPosition="left"
                  type="password"
                  name="newPassword"
                  value={newPassword}
                  onChange={this.onChange}
                  placeholder="New password"
                />
                <Button
                  primary
                  size="large"
                  disabled={isInvalid || loading}
                  type="submit"
                >
                    Confirm
                </Button>
              </Form>
              {error && <ErrorMessage error={error} />}
            </div>
          )}
        </Mutation>
      );
    }
}

export default RefreshPassword;
