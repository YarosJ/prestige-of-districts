import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import {
  Button, Input, Icon, Header, Container,
} from 'semantic-ui-react';
import ReactRouterPropTypes from 'react-router-prop-types';
import Loading from '../../Loading/index';
import AddRole from './AddRole/index';
import Role from './Role';
import checkPermission from '../../../helpers/checkPermission';
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
      data, loading,
    }) => {
      checkPermission({ history, redirect: true });

      const { roles } = data;

      if (loading || !roles) {
        return <Loading />;
      }

      return (
        <div style={{
          height: '100%',
          width: '100%',
          overflow: 'auto',
          paddingTop: '20px',
        }}
        >
          <AddRole
            className="access-control-header"
            style={{
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
                    Be careful editing roles or creating new:
                </Header.Subheader>
              </Header.Content>
            </Header>
            <Input placeholder="role" style={{ marginRight: '5px', margin: 'auto' }} size="mini" />
            <Button color="blue" size="mini" style={{ margin: 'auto' }}>
              Add Role
            </Button>
          </AddRole>
          {roles.map(role => (
            <Role key={role.role} role={role} />
          ))}
          <Container text textAlign="justified">
            <Footer />
          </Container>
        </div>
      );
    }}
  </Query>
);

AccessControl.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
};

export default AccessControl;
