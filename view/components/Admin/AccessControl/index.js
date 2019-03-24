import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Button, Input, Table, Icon, Header } from 'semantic-ui-react';
import Loading from '../../Loading';
import AddRole from './AddRole';
import DeleteRole from './DeleteRole';
import AddRoleAction from './AddRoleAction';
import DeleteRoleAction from './DeleteRoleAction';
import checkPermission from '../helpers/checkPermission';

const GET_ROLES = gql`
 query {
     roles {
      role
      actions
    }
  }
`;

const AccessControl = ({ history }) => (
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

      checkPermission(history);

      return (
        <div>
          <AddRole style={{ width: '85%', margin: 'auto', textAlign: 'center', marginBottom: '20px', }}>
            <Input placeholder="role" value='user' style={{ marginRight: '5px' }}/>
            <Button color='green'>
              Add Role
            </Button>
          </AddRole>
          {roles.map((role, key) => (
            <Role key={key} role={role}>
            </Role>
          ))}
        </div>
      );
    }}
  </Query>
);

const Role = ({ role, children }) => (
  <div style={{ width: '85%', margin: 'auto', marginBottom: '50px' }}>
    <Table striped>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell colSpan='2'>
            <Header style={{ textAlign: 'center', marginBottom: '10px' }}>
              {role.role}
            </Header>
            <div style={{ textAlign: 'center' }}>
              <AddRoleAction role={role}>
                <Input placeholder="logIn" style={{ marginRight: '5px' }}/>
                <Button primary color='green'>
                  Add action
                </Button>
              </AddRoleAction>
            </div>
          </Table.HeaderCell>
        </Table.Row>
        <Table.Row style={{ textAlign: 'center' }}>
          <Table.HeaderCell>Action</Table.HeaderCell>
          <Table.HeaderCell>Delete</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {
          role.actions.map((action, actionKey) => (
            <Action key={actionKey} action={action} role={role} />
          ))
        }
      </Table.Body>

      <Table.Footer fullWidth>
        <Table.Row>
          <Table.HeaderCell colSpan='2' style={{ textAlign: 'center' }}>
            <DeleteRole role={role}>
              <Button icon labelPosition='left' size='small' color='red' >
                <Icon name='user delete' /> Delete this role
              </Button>
            </DeleteRole>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    </Table>
    { children }
  </div>
);

const Action = ({ role, action }) => (
  <Table.Row>
    <Table.Cell style={{ textAlign: 'center' }}>{action}</Table.Cell>
    <Table.Cell style={{ textAlign: 'center' }}>
      <DeleteRoleAction action={action} role={role}>
        <Icon name='cancel' size='large' />
      </DeleteRoleAction>
    </Table.Cell>
  </Table.Row>
);

export default AccessControl;
