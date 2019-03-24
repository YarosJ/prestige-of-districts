import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown, Icon } from 'semantic-ui-react';
import * as routes from '../../constants/routes';
import SignOut from '../Account/SignOut';

const ProfileControl = ({ signed, history }) => (
  signed
    ? (
      <Dropdown labeled as="a" trigger={(<Icon name="user circle" size="large" />)} pointing="top right" icon={null}>
        <Dropdown.Menu>
          <Dropdown.Item>
            Item 1
          </Dropdown.Item>
          <Dropdown.Item onClick={() => history.push(routes.PROFILE)} content="Profile" icon="address card" />
          <Dropdown.Divider />
          <Dropdown.Item>
            <SignOut>
              <Icon name="sign out" size="large" />
            </SignOut>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    )
    : (
      <Dropdown style={{ color: '#4183c4' }} labeled trigger={(<Icon name="user circle" size="large" />)} pointing="top right" icon={null}>
        <Dropdown.Menu>
          <Dropdown.Item>
            Item 1
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={() => history.push(routes.SIGN_IN)}>
            <Icon name="sign in" size="large" />
            Войти
          </Dropdown.Item>
          <Dropdown.Item onClick={() => history.push(routes.SIGN_UP)}>
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
