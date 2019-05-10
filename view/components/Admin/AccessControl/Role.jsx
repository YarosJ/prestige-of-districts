import React from 'react';
import {
  Button, Header, Icon, Input, Table,
} from 'semantic-ui-react';
import Action from './Action';
import AddRoleAction from './AddRoleAction';
import DeleteRole from './DeleteRole';
import { rolePropType, childrenPropType } from '../../../constants/propTypes';

const Role = ({ role, children }) => (
  <div style={{
    width: '85%', maxWidth: '673px', margin: 'auto', marginBottom: '50px',
  }}
  >
    <Table basic="very">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell colSpan="2">
            <Header style={{ textAlign: 'center', marginBottom: '10px', color: '#2185d0' }}>
              {role.role}
            </Header>
            <div style={{ textAlign: 'center' }}>
              <AddRoleAction role={role}>
                <Input placeholder="logIn" style={{ marginRight: '5px' }} size="mini" />
                <Button primary color="green" size="mini">
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
          role.actions.map(action => (
            <Action key={action} action={action} role={role} />
          ))
        }
      </Table.Body>

      <Table.Footer fullWidth>
        <Table.Row>
          <Table.HeaderCell colSpan="2" style={{ textAlign: 'center' }}>
            <DeleteRole role={role}>
              <Button icon labelPosition="left" size="mini" color="red">
                <Icon name="user delete" />
                Delete this role
              </Button>
            </DeleteRole>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    </Table>
    { children }
  </div>
);

Role.propTypes = {
  role: rolePropType,
  children: childrenPropType,
};

Role.defaultProps = {
  role: {
    role: null,
    actions: [],
  },
  children: null,
};

export default Role;
