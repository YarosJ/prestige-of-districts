/* global localStorage */

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { Button, Form } from 'semantic-ui-react';
import ReactRouterPropTypes from 'react-router-prop-types';
import { routes } from '../../../config.json';
import ErrorMessage from '../../Error/index';

const SIGN_UP = gql`
  mutation($email: String!, $password: String!) {
    signUp(email: $email, password: $password) {
      id
      email
      role
    }
  }
`;

const INITIAL_STATE = {
  email: '',
  password: '',
  passwordConfirmation: '',
};

class SignUpForm extends Component {
  state = { ...INITIAL_STATE };

  onChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  onSubmit = (event, signUp) => {
    const { history } = this.props;
    signUp().then(async ({ data }) => {
      this.setState({ ...INITIAL_STATE });
      localStorage.setItem('id', data.signUp.id);
      history.push(routes.LANDING);
    });

    event.preventDefault();
  };

  render() {
    const {
      email,
      password,
      passwordConfirmation,
    } = this.state;

    const isInvalid = password !== passwordConfirmation
      || password === ''
      || email === '';

    return (
      <Mutation
        mutation={SIGN_UP}
        variables={{ email, password }}
      >
        {(signUp, { loading, error }) => (
          <Form onSubmit={event => this.onSubmit(event, signUp)}>
            <div style={{ textAlign: 'left', marginBottom: '20px' }}>
              <Form.Input
                icon="user"
                iconPosition="left"
                label="Email or Username"
                name="email"
                value={email}
                onChange={this.onChange}
                type="text"
                placeholder="Email or Username"
              />
              <Form.Input
                icon="lock"
                iconPosition="left"
                label="Password"
                type="password"
                name="password"
                value={password}
                onChange={this.onChange}
                placeholder="Password"
              />
              <Form.Input
                icon="lock"
                iconPosition="left"
                label="Confirm Password"
                type="password"
                name="passwordConfirmation"
                value={passwordConfirmation}
                onChange={this.onChange}
                placeholder="Confirm Password"
              />
            </div>
            <Button
              size="mini"
              content="Confirm"
              primary
              type="submit"
              disabled={isInvalid || loading}
            />
            {error && <ErrorMessage error={error} />}
          </Form>
        )}
      </Mutation>
    );
  }
}

SignUpForm.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
};

export default withRouter(SignUpForm);
