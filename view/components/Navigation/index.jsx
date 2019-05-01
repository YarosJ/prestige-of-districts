import React from 'react';
import posed from 'react-pose';
import 'react-input-range/lib/css/index.css';
import PropTypes from 'prop-types';
import { List, Icon } from 'semantic-ui-react';
import ProfileControl from './ProfileControl';
import * as routes from '../../constants/routes';

const Hoverable = posed.div({
  hoverable: true,
  init: { scale: 1 },
  hover: { scale: 1.2 },
});

const iconColor = 'blue';

const Navigation = ({ history }) => (
  <div
    style={{
      textAlign: 'center',
      paddingTop: '25px',
      paddingBottom: '30px',
      minWidth: '60px',
      boxShadow: '-2px -4px 9px 0px rgba(0,0,0,0.75)',
      zIndex: 10,
    }}
  >
    <List selection verticalAlign="middle">
      <List.Item style={{ marginBottom: '140px' }}>
        <ProfileControl history={history} signed={!!localStorage.getItem('uId')} />
      </List.Item>
      <List.Item style={{ marginBottom: '10px' }} onClick={() => history.push(routes.LANDING)}>
        <Hoverable>
          <Icon name="map outline" size="large" color={iconColor} />
        </Hoverable>
      </List.Item>
      <List.Item style={{ marginBottom: '10px' }} onClick={() => history.push(routes.CHARTS)}>
        <Hoverable>
          <Icon name="chart line" size="large" color={iconColor} />
        </Hoverable>
      </List.Item>
      <List.Item style={{ marginBottom: '10px' }} onClick={() => history.push(routes.MESSAGES)}>
        <Hoverable>
          <Icon name="warning sign" size="large" color={iconColor} />
        </Hoverable>
      </List.Item>
      <List.Item style={{ marginBottom: '10px' }} onClick={() => history.push(routes.FAILURES)}>
        <Hoverable>
          <Icon name="dont" size="large" color={iconColor} />
        </Hoverable>
      </List.Item>
      {!!localStorage.getItem('uId') && (
      <List.Item style={{ marginBottom: '10px' }} onClick={() => history.push(routes.USERS)}>
        <Hoverable>
          <Icon name="address card" size="large" color={iconColor} />
        </Hoverable>
      </List.Item>
      )}
      {!!localStorage.getItem('uId') && (
      <List.Item style={{ marginBottom: '10px' }} onClick={() => history.push(routes.TARGETS)}>
        <Hoverable>
          <Icon name="map signs" size="large" color={iconColor} />
        </Hoverable>
      </List.Item>
      )}
      {!!localStorage.getItem('uId') && (
      <List.Item style={{ marginBottom: '10px' }} onClick={() => history.push(routes.ACCESS_CONTROL)}>
        <Hoverable>
          <Icon name="unlock alternate" size="large" color={iconColor} />
        </Hoverable>
      </List.Item>
      )}
    </List>
  </div>
);

Navigation.propTypes = {
  history: PropTypes.objectOf(PropTypes.any),
};

Navigation.defaultProps = {
  history: {},
};

export default Navigation;
