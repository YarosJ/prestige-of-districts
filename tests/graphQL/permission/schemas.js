import { gql } from 'apollo-server-express';

export default {
  GET_ROLES: gql`
      query {
        roles {
           role
           actions
        }
      }
  `,
  GET_ACTIONS: gql`
      query($role: String!){
        actions(role: $role) {
           actions
        }
      }
  `,
  ADD_ROLE: gql`
      mutation($role: String!, $actions: [String]) {
          addRole(role: $role, actions: $actions) {
            role
            actions
          }
      }
  `,
  ADD_ACTION: gql`
      mutation($role: String!, $action: String!) {
          addAction(role: $role, action: $action) {
            role
            actions
          }
      }
  `,
  DELETE_ROLE: gql`
      mutation($role: String!) {
          deleteRole(role: $role) {
            role
            actions
          }
      }
  `,
  DELETE_ACTION: gql`
      mutation($role: String!, $action: String!) {
          deleteAction(role: $role, action: $action) {
            role
            actions
          }
      }
  `,
};
