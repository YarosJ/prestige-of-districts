import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Swal from 'sweetalert2';
import PropTypes from 'prop-types';
import ErrorMessage from '../../../Error/index';
import findInputNode from '../../../../helpers/findInputNode';
import { childrenPropType } from '../../../../constants/propTypes';

const ADD_ROLE = gql`
  mutation($role: String!) {
    addRole(role: $role) {
      role
      actions
    }
  }
`;

const GET_ROLES = gql`
 query {
     roles {
      role
      actions
    }
  }
`;

class AddRole extends Component {
  constructor(props) {
    super(props);
    this.state = {
      role: null,
    };

    this.submitAdd = async (e, addRole) => {
      const { target, currentTarget } = e;
      if (target.nodeName === 'BUTTON') {
        await this.setState({ role: findInputNode(currentTarget).value });
        await addRole();
        await Swal.fire({
          type: 'success',
          title: 'New role has been added',
          showConfirmButton: false,
          timer: 1000,
        });
      }
    };
  }

  render() {
    const { style, children } = this.props;
    const { role } = this.state;

    return (
      <Mutation
        mutation={ADD_ROLE}
        variables={{ role }}
        optimisticResponse={
          {
            addRole: {
              role,
              actions: [],
              __typename: 'Permission',
            },
          }
        }
        update={
          (proxy, { data: { addRole } }) => {
            const data = proxy.readQuery({ query: GET_ROLES });
            data.roles.push(addRole);
            proxy.writeQuery({
              query: GET_ROLES,
              data,
            });
          }
        }
      >
        {(addRole, { error }) => (
          <div
            role="button"
            tabIndex="-1"
            onClick={e => this.submitAdd(e, addRole)}
            onKeyPress={e => this.submitAdd(e, addRole)}
            style={style}
          >
            { children }
            { error && <ErrorMessage error={error} /> }
          </div>
        )}
      </Mutation>
    );
  }
}

AddRole.propTypes = {
  style: PropTypes.objectOf(PropTypes.any),
  children: childrenPropType,
};

AddRole.defaultProps = {
  style: {},
  children: null,
};

export default AddRole;
