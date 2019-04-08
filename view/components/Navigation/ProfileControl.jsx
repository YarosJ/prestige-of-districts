import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown, Icon } from 'semantic-ui-react';
import * as routes from '../../constants/routes';
import SignOut from '../Account/SignOut/index';

const ProfileControl = ({ signed, history }) => (
  signed
    ? (
      <Dropdown labeled as="a" trigger={(<Icon name="user circle" size="large" />)} pointing="left" lazyLoad icon={null}>
        <Dropdown.Menu className="dropdown-inverted">
          <Dropdown.Item style={{ color: '#e15597' }}>
            <Icon name="settings" size="large" />
            Settings
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => history.push(routes.PROFILE)}
            style={{ color: '#e15597' }}
          >
            <Icon name="address card" size="large" />
            Profile
          </Dropdown.Item>
          <Dropdown.Divider style={{ background: '#191a1a' }} />
          <Dropdown.Item style={{ color: '#e15597' }}>
            <SignOut>
              <Icon name="sign out" size="large" />
            </SignOut>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    )
    : (
      <Dropdown labeled as="a" trigger={(<Icon name="user circle" size="large" />)} pointing="left" lazyLoad icon={null}>
        <Dropdown.Menu className="dropdown-inverted">
          <Dropdown.Item onClick={() => history.push(routes.SIGN_IN)} style={{ color: '#e15597' }}>
            <Icon name="sign in" size="large" />
            Войти
          </Dropdown.Item>
          <Dropdown.Item onClick={() => history.push(routes.SIGN_UP)} style={{ color: '#e15597' }}>
            <Icon name="sign in" size="large" />
            Регистрация
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    ));

ProfileControl.propTypes = {
  signed: PropTypes.bool,
  history: PropTypes.objectOf(PropTypes.any),
};

ProfileControl.defaultProps = {
  signed: false,
  history: {},
};

export default ProfileControl;
