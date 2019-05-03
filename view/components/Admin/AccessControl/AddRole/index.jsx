import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Swal from 'sweetalert2';
import ErrorMessage from '../../../Error/index';

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

const findInputNode = (target) => {
  let input = null;

  target.childNodes.forEach((n) => {
    if (!n || input) return null;
    if (n.nodeName === 'INPUT') {
      input = n;
      return null;
    }
    if (n.childNodes) input = findInputNode(n);
    return null;
  });

  return input;
};

class AddRole extends Component {
  constructor(props) {
    super(props);
    this.state = {
      role: undefined,
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
    const { style } = this.props;
    return (
      <Mutation
        mutation={ADD_ROLE}
        variables={{ role: this.state.role }}
        optimisticResponse={
          {
            addRole: {
              role: this.state.role,
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
        {(addRole, { data, loading, error }) => (
          <div onClick={e => this.submitAdd(e, addRole)} style={style}>
            { this.props.children }
            { error && <ErrorMessage error={error} /> }
          </div>
        )}
      </Mutation>
    );
  }
}

export default AddRole;
