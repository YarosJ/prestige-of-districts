import React, {Component, Fragment} from 'react';
import gql from "graphql-tag";
import {Query} from "react-apollo";
import Loading from "../../../Loading";

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
    this.props.updateUser(e.target.options[e.target.selectedIndex].value);
  }

  render() {
    return (
      <Query
        query={GET_ROLES}
      >
        {({
          data, loading, error,
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
              value={this.props.value}
              onChange={this.updateUser.bind(this)}>
              {roles.map((role, key) => (
                <option key={key} style={{ background: 'aliceblue' }} value={role.role}>{role.role}</option>
              ))}
            </select>
          );
        }}
      </Query>
    );
  }
}

export default SelectPanel;
