import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import {
  Grid, Header, Icon, Form, Button, Segment, Divider,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import * as routes from '../../../constants/routes';
import ErrorMessage from '../../Error/index';

const SIGN_IN = gql`
  mutation($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      accessToken
      refreshToken
      user {
        id
        role
      }
    }
  }
`;

const INITIAL_STATE = {
  email: '',
  password: '',
};

class SignInPage extends Component {
  state = { ...INITIAL_STATE };

  onChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  onSubmit = async (event, signIn) => {
    const { history } = this.props;
    signIn().then(async ({ data }) => {
      await this.setState({ ...INITIAL_STATE });
      localStorage.setItem('accessToken', data.signIn.accessToken);
      localStorage.setItem('refreshToken', data.signIn.refreshToken);
      localStorage.setItem('uId', data.signIn.user.id);
      localStorage.setItem('role', data.signIn.user.role);
      history.push(routes.LANDING);
    });

    event.preventDefault();
  };

  render() {
    const { email, password } = this.state;
    const { history } = this.props;
    const isInvalid = password === '' || email === '';

    return (
      <Mutation mutation={SIGN_IN} variables={{ email, password }}>
        {(signIn, { loading, error }) => (
          <div style={{ height: '100%', width: '100%', overflow: 'auto' }}>
            <div className="login-form" style={{ margin: '80px 45px 80px 45px' }}>
              <Header as="h2" icon textAlign="center" inverted>
                <Icon name="map outline" circular style={{ border: 'solid rgb(224, 225, 226)' }} />
                <Header.Content>Prestige Of Districts</Header.Content>
              </Header>
              <Segment style={{ boxShadow: '5px 6px 16px 3px rgba(0,0,0,0.75)' }}>
                <Grid columns={2} relaxed="very" stackable>
                  <Grid.Column>
                    <Form onSubmit={async event => this.onSubmit(event, signIn)}>
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

                      <Button
                        content="Login"
                        primary
                        disabled={isInvalid || loading}
                        type="submit"
                      />
                    </Form>
                  </Grid.Column>

                  {error && <ErrorMessage error={error} />}

                  <Grid.Column verticalAlign="middle">
                    <Button
                      content="Sign up"
                      icon="signup"
                      size="big"
                      onClick={() => history.push(routes.SIGN_UP)}
                    />
                  </Grid.Column>
                </Grid>

                <Divider vertical>Or</Divider>
              </Segment>
            </div>
          </div>
        )}
      </Mutation>
    );
  }
}

SignInPage.propTypes = {
  history: PropTypes.objectOf(PropTypes.any),
};

SignInPage.defaultProps = {
  history: {},
};

export default withRouter(SignInPage);
