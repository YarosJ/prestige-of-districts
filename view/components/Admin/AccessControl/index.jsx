import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import {
  Button, Input, Table, Icon, Header, Container,
} from 'semantic-ui-react';
import Loading from '../../Loading/index';
import AddRole from './AddRole/index';
import DeleteRole from './DeleteRole/index';
import AddRoleAction from './AddRoleAction/index';
import DeleteRoleAction from './DeleteRoleAction/index';
import checkPermission from '../helpers/checkPermission';
import Footer from '../../Footer/index';

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

      // checkPermission(history);

      return (
        <div style={{
          height: '100%',
          width: '100%',
          overflow: 'auto',
          background: '#1a1c1d',
          paddingTop: '20px',
        }}
        >
          <AddRole style={{
            width: '85%', margin: 'auto', textAlign: 'center', marginBottom: '20px',
          }}
          >
            <Input placeholder="role" style={{ marginRight: '5px' }} inverted />
            <Button color="green">
              Add Role
            </Button>
          </AddRole>
          {roles.map((role, key) => (
            <Role key={key} role={role} />
          ))}
          <Container text textAlign="justified">
            <Footer />
          </Container>
        </div>
      );
    }}
  </Query>
);

const Role = ({ role, children }) => (
  <div style={{ width: '85%', margin: 'auto', marginBottom: '50px' }}>
    <Table striped inverted>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell colSpan="2">
            <Header style={{ textAlign: 'center', marginBottom: '10px' }} inverted>
              {role.role}
            </Header>
            <div style={{ textAlign: 'center' }}>
              <AddRoleAction role={role}>
                <Input placeholder="logIn" style={{ marginRight: '5px' }} inverted />
                <Button primary color="green">
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
          <Table.HeaderCell colSpan="2" style={{ textAlign: 'center' }}>
            <DeleteRole role={role}>
              <Button icon labelPosition="left" size="small" color="red">
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

const Action = ({ role, action }) => (
  <Table.Row>
    <Table.Cell style={{ textAlign: 'center' }}>{action}</Table.Cell>
    <Table.Cell style={{ textAlign: 'center' }}>
      <DeleteRoleAction action={action} role={role}>
        <Icon name="cancel" size="large" />
      </DeleteRoleAction>
    </Table.Cell>
  </Table.Row>
);

export default AccessControl;
