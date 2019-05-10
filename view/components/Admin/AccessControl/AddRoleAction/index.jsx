import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import ErrorMessage from '../../../Error/index';
import findInputNode from '../../../../helpers/findInputNode';
import { rolePropType, childrenPropType } from '../../../../constants/propTypes';

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
      action: null,
    };

    this.submitAdd = async (e, addRoleAction) => {
      const { target, currentTarget } = e;
      if (target.nodeName === 'BUTTON') {
        await this.setState({ action: findInputNode(currentTarget).value });
        addRoleAction();
      }
    };
  }

  render() {
    const { children, role } = this.props;
    const { action } = this.state;

    return (
      <Mutation
        mutation={ADD_ROLE_ACTION}
        variables={{ role: role.role, action }}
        optimisticResponse={
          {
            addAction: {
              role: role.role,
              actions: [
                ...role.actions,
                action,
              ],
              __typename: 'Permission',
            },
          }
        }
        update={
          (cache, { data: { addAction } }) => {
            const data = cache.readQuery({ query: GET_ROLES });

            data.roles.forEach((r, index) => {
              if (r.role === addAction.role) {
                data.roles[index].actions = addAction.actions;
              }
            });

            cache.writeQuery({
              query: GET_ROLES,
              data,
            });
          }
        }
      >
        {(addRoleAction, { error }) => (
          <div
            role="button"
            tabIndex="-1"
            onClick={e => this.submitAdd(e, addRoleAction)}
            onKeyPress={e => this.submitAdd(e, addRoleAction)}
          >
            { children }
            { error && <ErrorMessage error={error} /> }
          </div>
        )}
      </Mutation>
    );
  }
}

AddRoleAction.propTypes = {
  role: rolePropType,
  children: childrenPropType,
};

AddRoleAction.defaultProps = {
  role: {
    role: null,
    actions: [],
  },
  children: null,
};

export default AddRoleAction;
