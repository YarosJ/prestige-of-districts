import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { Button, Form, Grid, Header, Icon, Message, Segment } from 'semantic-ui-react';
import * as routes from '../../../constants/routes';
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

const SignUpPage = ({ history }) => (
  <div className='login-form' style={{ marginTop: '30px', marginBottom: '50px' }}>
    <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='teal' textAlign='center'>
          <Icon color='teal' name='shield alternate' /> Создать аккаунт
        </Header>
        <SignUpForm history={history} />
      </Grid.Column>
    </Grid>
  </div>
);

class SignUpForm extends Component {
  state = { ...INITIAL_STATE };

  onChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  onSubmit = (event, signUp) => {
    signUp().then(async ({ data }) => {
      this.setState({ ...INITIAL_STATE });

      localStorage.setItem('id', data.signUp.id);

      this.props.history.push(routes.LANDING);
    });

    event.preventDefault();
  };

  render() {
    const {
      email,
      password,
      passwordConfirmation,
    } = this.state;

    const isInvalid =
      password !== passwordConfirmation ||
      password === '' ||
      email === '';

    return (
      <Mutation
        mutation={SIGN_UP}
        variables={{ email, password }}
      >
        {(signUp, { data, loading, error }) => (
          <Form style={{ marginTop: '30px', marginBottom: '50px' }} size='large' onSubmit={event => this.onSubmit(event, signUp)}>
            <Form.Input
              fluid icon='user'
              iconPosition='left'
              name="email"
              value={email}
              onChange={this.onChange}
              type="text"
              placeholder="Email Address"
            />
            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              name="password"
              value={password}
              onChange={this.onChange}
              type="password"
              placeholder="Password"
            />
            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              name="passwordConfirmation"
              value={passwordConfirmation}
              onChange={this.onChange}
              type="password"
              placeholder="Confirm Password"
            />
            <Button
              color='teal'
              fluid size='large'
              disabled={isInvalid || loading}
              type="submit">
              Подтвердить
            </Button>

            {error && <ErrorMessage error={error} />}
          </Form>
        )}
      </Mutation>
    );
  }
}

export default withRouter(SignUpPage);
