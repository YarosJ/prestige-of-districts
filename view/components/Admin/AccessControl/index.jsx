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
          paddingTop: '20px',
        }}
        >
          <AddRole style={{
            width: '85%',
            margin: 'auto',
            textAlign: 'center',
            marginBottom: '50px',
            display: 'flex',
            maxWidth: '700px',
          }}
          >
            <Header
              color="blue"
              as="h2"
              style={{
                margin: 'auto',
                marginBottom: '35px',
                marginTop: '10px',
              }}
            >
              <Icon name="pencil alternate" />
              <Header.Content>
                  Access control
                <Header.Subheader>
                    You can edit roles or create new role:
                </Header.Subheader>
              </Header.Content>
            </Header>
            <Input placeholder="role" style={{ marginRight: '5px', margin: 'auto' }} size="mini" />
            <Button color="blue" size="mini" style={{ margin: 'auto' }}>
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
          role.actions.map((action, actionKey) => (
            <Action key={actionKey} action={action} role={role} />
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
