import PropTypes from 'prop-types';

export const failuresPropTypes = PropTypes.arrayOf(PropTypes.shape({
  failureType: PropTypes.string,
  text: PropTypes.string,
  locations: PropTypes.arrayOf(PropTypes.shape({
    longitude: PropTypes.number,
    latitude: PropTypes.number,
  })),
}));

export const messagesPropTypes = {};
