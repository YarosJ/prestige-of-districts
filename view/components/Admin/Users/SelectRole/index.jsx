import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import Loading from '../../../Loading/index';

const GET_ROLES = gql`
 query {
     roles {
      role
      actions
    }
  }
`;

class SelectPanel extends Component {
  updateUser(e) {
    const { updateUser } = this.props;
    updateUser(e.target.options[e.target.selectedIndex].value);
  }

  render() {
    const { value } = this.props;

    return (
      <Query
        query={GET_ROLES}
      >
        {({
          data, loading,
        }) => {
          const { roles } = data;
          if (loading || !roles) {
            return <Loading />;
          }

          return (
            <select
              style={{
                borderRadius: '3px',
                padding: '3px',
                background: 'aliceblue',
              }}
              value={value}
              onChange={this.updateUser.bind(this)}
            >
              {roles.map(role => (
                <option key={role.role} style={{ background: 'aliceblue' }} value={role.role}>
                  {role.role}
                </option>
              ))}
            </select>
          );
        }}
      </Query>
    );
  }
}

SelectPanel.propTypes = {
  updateUser: PropTypes.func,
  value: PropTypes.string,
};

SelectPanel.defaultProps = {
  updateUser: null,
  value: null,
};

export default SelectPanel;
