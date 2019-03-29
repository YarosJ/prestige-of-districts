import React from 'react';
import { Grid, Header, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import SignUpForm from './SignUpForm';

const SignUpPage = ({ history }) => (
  <div className="login-form" style={{ marginTop: '30px', marginBottom: '50px' }}>
    <Grid textAlign="center" style={{ height: '100%' }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          <Icon color="teal" name="shield alternate" />
            Создать аккаунт
        </Header>
        <SignUpForm history={history} />
      </Grid.Column>
    </Grid>
  </div>
);

SignUpPage.propTypes = {
  history: PropTypes.objectOf(PropTypes.any),
};

SignUpPage.defaultProps = {
  history: {},
};

export default SignUpPage;
