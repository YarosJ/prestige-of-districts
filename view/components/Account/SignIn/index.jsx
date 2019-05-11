import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import {
  Grid, Image, Form, Button, Segment, Header,
} from 'semantic-ui-react';
import ReactRouterPropTypes from 'react-router-prop-types';
import localStorageSet from '../../../helpers/localStorageSet';
import { routes } from '../../../config.json';
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
      await localStorageSet([
        { key: 'accessToken', value: data.signIn.accessToken },
        { key: 'refreshToken', value: data.signIn.refreshToken },
        { key: 'role', value: data.signIn.user.role },
        { key: 'uId', value: data.signIn.user.id },
      ]);

      history.push(routes.LANDING);
    });

    event.preventDefault();
  };

  render() {
    const { email, password } = this.state;
    const { history } = this.props;

    return (
      <Mutation mutation={SIGN_IN} variables={{ email, password }}>
        {(signIn, { error }) => (
          <div className="account-form" style={{ margin: '80px 45px 80px 45px', display: 'flex' }}>
            <Segment
              style={{
                boxShadow: 'rgba(0, 0, 0, 0.75) 0px 0px 7px -4px',
                borderRadius: 0,
                maxWidth: '850px',
                margin: 'auto',
              }}
            >
              <Grid columns={2} stackable>
                <Grid.Column style={{ padding: 0 }} width={9}>
                  <Image
                    src="maps/pointmap-white.png"
                    style={{
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </Grid.Column>
                <Grid.Column
                  width={7}
                  style={{ textAlign: 'center' }}
                >
                  <Image
                    src="map.png"
                    style={{
                      width: '55px',
                      margin: 'auto',
                    }}
                  />
                  <Header>Log in to your account</Header>
                  <Form onSubmit={async event => this.onSubmit(event, signIn)}>
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
                    </div>
                    <Button.Group size="mini">
                      <Button
                        content="Login"
                        primary
                        type="submit"
                      />
                      <Button.Or />
                      <Button
                        content="Sign up"
                        primary
                        onClick={() => history.push(routes.SIGN_UP)}
                      />
                    </Button.Group>
                  </Form>
                </Grid.Column>

                {error && <ErrorMessage error={error} />}
              </Grid>
            </Segment>
          </div>
        )}
      </Mutation>
    );
  }
}

SignInPage.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
};

export default withRouter(SignInPage);
