import React from 'react';
import { Icon, List } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import posed from 'react-pose';
import MapSidebar from './MapSidebar';
import ProfileControl from './ProfileControl';
import 'react-input-range/lib/css/index.css';
import * as routes from '../../constants/routes';

const Hoverable = posed.div({
  hoverable: true,
  init: { scale: 1 },
  hover: { scale: 1.2 },
});

const Landing = ({ history }) => (
  <div style={{
    display: 'flex',
    padding: 0,
    height: '104.5%',
  }}
  >
    <div
      style={{
        textAlign: 'center',
        background: '#282226  drag: { scale: 1.1 },',
        paddingTop: '25px',
        paddingBottom: '30px',
        width: '60px',
      }}
    >
      <List selection verticalAlign="middle">
        <List.Item style={{ marginBottom: '140px' }}>
          <ProfileControl history={history} signed={!!localStorage.getItem('uId')} />
        </List.Item>
        <List.Item style={{ marginBottom: '10px' }} onClick={() => history.push(routes.LANDING)}>
          <Hoverable>
            <Icon name="map outline" size="large" color="pink" />
          </Hoverable>
        </List.Item>
        <List.Item style={{ marginBottom: '10px' }} onClick={() => history.push(routes.CHARTS)}>
          <Hoverable>
            <Icon name="chart line" size="large" color="pink" />
          </Hoverable>
        </List.Item>
      </List>
    </div>
    <div style={{
      padding: 0,
      width: '100%',
      height: '100%',
    }}
    >
      <MapSidebar />
    </div>
  </div>
);

Landing.propTypes = {
  history: PropTypes.objectOf(PropTypes.any),
};

Landing.defaultProps = {
  history: {},
};

export default Landing;
