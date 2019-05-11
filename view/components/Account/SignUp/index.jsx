import React from 'react';
import {
  Grid, Header, Image, Segment,
} from 'semantic-ui-react';
import ReactRouterPropTypes from 'react-router-prop-types';
import SignUpForm from './SignUpForm';

const SignUpPage = ({ history }) => (
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
          <Header>Create your account</Header>
          <SignUpForm history={history} />
        </Grid.Column>
      </Grid>
    </Segment>
  </div>
);

SignUpPage.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
};

export default SignUpPage;
