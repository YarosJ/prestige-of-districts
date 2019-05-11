import React from 'react';
import { Dropdown, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { routes } from '../../config.json';
import SignOut from '../Account/SignOut/index';

const iconColor = 'blue';

const ProfileControl = ({ signed, history }) => (
  <Dropdown labeled as="a" trigger={(<Icon name="user circle" size="large" />)} pointing="left" lazyLoad icon={null}>
    {signed
      ? (
        <Dropdown.Menu>
          <Dropdown.Item
            onClick={() => history.push(routes.PROFILE)}
          >
            <Icon name="settings" size="large" color={iconColor} />
            Settings
          </Dropdown.Item>
          <Dropdown.Item>
            <SignOut>
              <Icon name="sign out" size="large" color={iconColor} />
            </SignOut>
          </Dropdown.Item>
        </Dropdown.Menu>
      )
      : (
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => history.push(routes.SIGN_IN)}>
            <Icon name="sign in" size="large" color={iconColor} />
            Sign In
          </Dropdown.Item>
          <Dropdown.Item onClick={() => history.push(routes.SIGN_UP)}>
            <Icon name="sign in" size="large" color={iconColor} />
            Sign Up
          </Dropdown.Item>
        </Dropdown.Menu>
      )}
  </Dropdown>
);


ProfileControl.propTypes = {
  signed: PropTypes.bool,
  history: ReactRouterPropTypes.history.isRequired,
};

ProfileControl.defaultProps = {
  signed: false,
};

export default ProfileControl;
