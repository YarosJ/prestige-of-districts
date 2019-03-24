import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import ErrorMessage from '../../../Error';

const ADD_ROLE_ACTION = gql`
  mutation($role: String!, $action: String!) {
    addAction(role: $role, action: $action) {
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

class AddRoleAction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      action: undefined,
    };

    this.submitAdd = async (e, addRoleAction) => {
      const { target, currentTarget } = e;
      if (target.nodeName === 'BUTTON') {
        let input = currentTarget.childNodes[0];
        while (input.nodeName !== 'INPUT') {
          input
            ? input = input.childNodes[0]
            : () => {throw('Input not found')};
        }
        await this.setState({ action: input.value });
        addRoleAction();
      }
    };
  }

  render() {
    return (
      <Mutation
        mutation={ADD_ROLE_ACTION}
        variables={{ role: this.props.role.role, action: this.state.action }}
        optimisticResponse={
          {
            addAction: {
              role: this.props.role.role,
              actions: [
                ...this.props.role.actions,
                this.state.action,
              ],
              __typename: 'Permission',
            },
          }
        }
        update={
          (proxy, { data: { addAction } }) => {
            const data = proxy.readQuery({ query: GET_ROLES });

            data.roles.map((role) => {
              if (role.role === addAction.role) {
                role.actions = addAction.actions;
              }
            });

            proxy.writeQuery({
              query: GET_ROLES,
              data,
            });
          }
        }
      >
        {(addRoleAction, { data, loading, error }) => (
          <div onClick={e => this.submitAdd(e, addRoleAction)}>
            { this.props.children }
            { error && <ErrorMessage error={error} /> }
          </div>
        )}
      </Mutation>
    );
  }
}

export default AddRoleAction;
