import React from 'react';
import PropTypes from 'prop-types';
import MapSidebar from './MapSidebar';
import 'react-input-range/lib/css/index.css';
import Navigation from './Navigation';

const Landing = ({ history }) => (
  <div style={{
    display: 'flex',
    padding: 0,
    height: '104.5%',
  }}
  >
    <Navigation history={history} />
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
