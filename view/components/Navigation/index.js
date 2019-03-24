/* global localStorage */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Container, Icon,
  Menu,
  Visibility,
  Responsive,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Mobile from './mobile';
import * as routes from '../../constants/routes';
import ProfileControl from './ProfileControl';

const menuStyle = {
  border: 'none',
  borderRadius: 0,
  boxShadow: 'none',
  marginTop: '10px',
};

const fixedMenuStyle = {
  backgroundColor: '#fff',
  border: '1px solid #ddd',
  boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)',
};

class Navigation extends Component {
  state = { menuFixed: false };

  stickTopMenu = () => this.setState({ menuFixed: true });

  unStickTopMenu = () => this.setState({ menuFixed: false });

  render() {
    const { menuFixed } = this.state;
    const { history } = this.props;
    const signed = !!localStorage.getItem('uId');
    let isAdmin;

    if (localStorage.getItem('role')) {
      isAdmin = localStorage.getItem('role').match(/admin/gi);
    } else isAdmin = false;

    return (
      <div>
        <Visibility
          onBottomPassed={this.stickTopMenu}
          onBottomVisible={this.unStickTopMenu}
          once={false}
        >
          <Responsive minWidth={Responsive.onlyTablet.minWidth}>
            <Menu
              id="top-scroll"
              borderless
              fixed={menuFixed ? 'top' : undefined}
              style={menuFixed ? fixedMenuStyle : menuStyle}
            >
              <Container text style={{ display: 'contents' }}>
                <Menu.Item>
                  <Link to="#">Link 1</Link>
                </Menu.Item>
                <Menu.Item position="right">
                  <Link to={routes.LANDING}>
                    <div style={{
                      width: '400px',
                      fontFamily: 'Black Ops One, cursive',
                      fontSize: '-webkit-xxx-large',
                      textAlign: 'left',
                      lineHeight: 0,
                    }}
                    >
                      <Icon name="pencil alternate" style={{ fontSize: '0.85em', height: 0 }} />
                      PD
                    </div>
                  </Link>
                </Menu.Item>
                <Menu.Item position="right">
                  <ProfileControl history={history} signed={signed} />
                </Menu.Item>
              </Container>
            </Menu>
          </Responsive>
          <Responsive {...Responsive.onlyMobile}>
            <Mobile signed={signed} isAdmin={isAdmin} history={history} />
          </Responsive>
        </Visibility>
      </div>
    );
  }
}

Navigation.propTypes = {
  history: PropTypes.objectOf(PropTypes.any),
};

Navigation.defaultProps = {
  history: {},
};

export default Navigation;
