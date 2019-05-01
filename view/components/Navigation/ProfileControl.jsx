import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown, Icon } from 'semantic-ui-react';
import * as routes from '../../constants/routes';
import SignOut from '../Account/SignOut/index';

const iconColor = 'blue';

const ProfileControl = ({ signed, history }) => (
  <Dropdown labeled as="a" trigger={(<Icon name="user circle" size="large" />)} pointing="left" lazyLoad icon={null}>
    {signed
      ? (
        <Dropdown.Menu>
          <Dropdown.Item>
            <Icon name="settings" size="large" color={iconColor} />
            Settings
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => history.push(routes.PROFILE)}
          >
            <Icon name="address card" size="large" color={iconColor} />
            Profile
          </Dropdown.Item>
          <Dropdown.Divider />
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
            Войти
          </Dropdown.Item>
          <Dropdown.Item onClick={() => history.push(routes.SIGN_UP)}>
            <Icon name="sign in" size="large" color={iconColor} />
            Регистрация
          </Dropdown.Item>
        </Dropdown.Menu>
      )}
  </Dropdown>
);


ProfileControl.propTypes = {
  signed: PropTypes.bool,
  history: PropTypes.objectOf(PropTypes.any),
};

ProfileControl.defaultProps = {
  signed: false,
  history: {},
};

export default ProfileControl;
