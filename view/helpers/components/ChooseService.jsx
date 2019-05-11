import { Query } from 'react-apollo';
import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { GET_SERVICES } from '../../constants/queries';
import Loading from '../../components/Loading';

const renderLabel = label => ({
  color: 'blue',
  content: label.text,
  icon: 'check',
});

const ChooseService = ({
  handleChange, value, style, multiple,
}) => (
  <Query
    query={GET_SERVICES}
  >
    {({ data, loading }) => {
      const { services } = data;
      if (loading || !services) {
        return <Loading />;
      }
      const options = services.map((s, key) => ({ key, text: s, value: s }));

      return (
        <Dropdown
          style={style}
          onChange={handleChange}
          options={options}
          placeholder="Choose an option"
          selection
          compact
          multiple={!!multiple}
          value={value}
          renderLabel={renderLabel}
        />
      );
    }}
  </Query>
);

ChooseService.propTypes = {
  handleChange: PropTypes.func,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  style: PropTypes.objectOf(PropTypes.any),
  multiple: PropTypes.bool,
};

ChooseService.defaultProps = {
  handleChange: null,
  value: null,
  style: {},
  multiple: false,
};

export default ChooseService;
