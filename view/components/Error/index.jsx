import React from 'react';
import PropTypes from 'prop-types';

const ErrorMessage = ({ error }) => (
  <div>
    <small>{error.message}</small>
  </div>
);

ErrorMessage.propTypes = {
  error: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ErrorMessage;
