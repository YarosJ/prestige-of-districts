import PropTypes from 'prop-types';

export const historyPropType = PropTypes.objectOf(PropTypes.any);

export const failuresPropType = PropTypes.arrayOf(PropTypes.shape({
  failureType: PropTypes.string,
  text: PropTypes.string,
  locations: PropTypes.arrayOf(PropTypes.shape({
    longitude: PropTypes.number,
    latitude: PropTypes.number,
  })),
}));

export const rolePropType = PropTypes.shape({
  role: PropTypes.string,
  actions: PropTypes.arrayOf(PropTypes.string),
});

export const childrenPropType = PropTypes.oneOfType([
  PropTypes.element,
  PropTypes.string,
  PropTypes.arrayOf(PropTypes.any),
]);
