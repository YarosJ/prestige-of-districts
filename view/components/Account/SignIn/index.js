import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import {
  Grid, Header, Icon, Message,
} from 'semantic-ui-react';
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
    signIn().then(async ({ data }) => {
      await this.setState({ ...INITIAL_STATE, user: data.signIn.user.id });
      localStorage.setItem('accessToken', data.signIn.accessToken);
      localStorage.setItem('refreshToken', data.signIn.refreshToken);
      localStorage.setItem('uId', data.signIn.user.id);
      localStorage.setItem('role', data.signIn.user.role);
      this.props.history.push(routes.LANDING);
    });

    event.preventDefault();
  };

  render() {
    const { email, password, user } = this.state;
    const isInvalid = password === '' || email === '';

    return (
      <Mutation mutation={SIGN_IN} variables={{ email, password }}>
        {(signIn, { data, loading, error }) => (
          <div className="login-form" style={{ marginTop: '30px', marginBottom: '50px' }}>
            <Grid textAlign="center" style={{ height: '100%' }} verticalAlign="middle">
              <Grid.Column style={{ maxWidth: 450 }}>
                <Header as="h2" color="teal" textAlign="center">
                  <Icon color="teal" name="shield alternate" />
                  {' '}
                  Войти в аккаунт
                </Header>
                <Message>
                    Еще нет аккаунта?
                  {' '}
                  <Link to={routes.SIGN_UP}>Регистрация</Link>
                </Message>
                {error && <ErrorMessage error={error} />}
              </Grid.Column>
            </Grid>
          </div>
        )}
      </Mutation>
    );
  }
}

export default withRouter(SignInPage);
