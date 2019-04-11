import { Query } from 'react-apollo';
import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import { GET_SERVICES } from '../constants/queries';
import Loading from '../components/Loading/index';

export default ({ handleChange, value, style }) => (
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
          multiple
          value={value}
        />
      );
    }}
  </Query>
);