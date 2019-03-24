import React, { Component } from 'react';
import {
  Dropdown,
  Icon,
  Menu,
  Sidebar,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import * as routes from '../../constants/routes';
import SignOut from '../Account/SignOut';

const NavBarMobile = ({
  children,
  onPusherClick,
  onToggle,
  visible,
  signed,
  isAdmin,
  history,
}) => (
  <div style={{ height: '50px' }}>
    <Sidebar.Pushable style={{
      width: '102%', height: visible ? '100vh' : '250px', position: 'fixed', zIndex: '100',
    }}
    >
      <Sidebar
        as={Menu}
        animation="overlay"
        icon="labeled"
        vertical
        visible={visible}
      >
        <Menu.Item style={{ marginTop: '10px', paddingBottom: '20px' }}>
          <Link to={routes.LANDING}>
            <div style={{
              fontFamily: 'Black Ops One, cursive',
              fontSize: 'x-large',
              lineHeight: 0,
            }}
            >
              <Icon name="pencil alternate" style={{ fontSize: '0.85em', height: 0 }} />
              PD
            </div>
          </Link>
        </Menu.Item>
        {signed && isAdmin
          ? (
            <div>
              <Menu.Item style={{ textAlign: 'left' }}>
                <Link to={routes.USERS}>
                  <Icon name="address card" />
                  Пользователи
                </Link>
              </Menu.Item>
              <Menu.Item style={{ textAlign: 'left' }}>
                <Link to={routes.ACCESS_CONTROL}>
                  <Icon name="lock" />
                  Доступ
                </Link>
              </Menu.Item>
            </div>
          )
          : (
            <div>
              <Menu.Item style={{ textAlign: 'left' }}>
                <Link to="#">Just Link1</Link>
              </Menu.Item>
              <Menu.Item style={{ textAlign: 'left' }}>
                <Link to="#">Just Link2</Link>
              </Menu.Item>
            </div>
          )
        }
      </Sidebar>
      <Sidebar.Pusher
        dimmed={visible}
        onClick={onPusherClick}
        style={{ height: visible ? '100vh' : '50px' }}
      >
        <Menu secondary fixed="top" style={{ height: '50px', background: 'white' }}>
          <Menu.Item onClick={onToggle}>
            <Icon name="sidebar" />
          </Menu.Item>
          <Menu.Item style={{ margin: 'auto' }}>
            <Link to={routes.LANDING}>
              <div style={{
                fontFamily: 'Black Ops One, cursive',
                fontSize: 'xx-large',
                lineHeight: 0,
              }}
              >
                <Icon name="pencil alternate" style={{ fontSize: '0.85em', height: 0 }} />
                PD
              </div>
            </Link>
          </Menu.Item>
          <Menu.Item style={{ right: '7px' }}>
            {signed
              ? (
                <Dropdown labeled as="a" trigger={(<Icon name="user circle" size="large" />)} pointing="top right" icon={null}>
                  <Dropdown.Menu>
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
                <Dropdown style={{ color: '#4183c4', marginLeft: '-15px' }} labeled trigger={(<Icon name="user circle" size="large" />)} pointing="top right" icon={null}>
                  <Dropdown.Menu>
                    12345
                      <Dropdown.Divider />
                      <Dropdown.Item onClick={() => history.push(routes.SIGN_IN)}>
                      <Icon name="sign in" size="large" />
                      <a>Войти</a>
                    </Dropdown.Item>
                      <Dropdown.Item onClick={() => history.push(routes.SIGN_UP)}>
                      <Icon name="sign in" size="large" />
                      <a>Регистрация</a>
                    </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
              )
            }
          </Menu.Item>
        </Menu>
        {children}
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  </div>
);

class NavBar extends Component {
  state = {
    visible: false,
  };

  handlePusher = () => {
    const { visible } = this.state;

    if (visible) this.setState({ visible: false });
  };

  handleToggle = () => this.setState({ visible: !this.state.visible });

  render() {
    const { visible } = this.state;
    const {
      signed, isAdmin, history,
    } = this.props;

    return (
      <NavBarMobile
        onPusherClick={this.handlePusher}
        onToggle={this.handleToggle}
        visible={visible}
        signed={signed}
        isAdmin={isAdmin}
        history={history}
      />
    );
  }
}

export default NavBar;
