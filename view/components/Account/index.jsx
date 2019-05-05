/* global localStorage */

import React from 'react';
import { Query } from 'react-apollo';
import { Container, Header, Table } from 'semantic-ui-react';
import { GET_USER } from '../../constants/queries';
import Loading from '../Loading';
import Footer from '../Footer';
import Modal from '../../helpers/Modal';
import RefreshPassword from './RefreshPassword';

const Profile = () => (
  <Query
    query={GET_USER}
    variables={{ id: localStorage.getItem('uId') }}
  >
    {({
      data, loading, error,
    }) => {
      const { user } = data;
      if (loading || !user) {
        return <Loading />;
      }

      return (
        <Container style={{ paddingTop: '50px' }}>
          <Header>ACCOUNT</Header>
          <Table basic="very">
            <Table.Body>
              <Table.Row>
                <Table.Cell>Email</Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Role</Table.Cell>
                <Table.Cell>{user.role || 'user'}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Created At</Table.Cell>
                <Table.Cell>{new Date(user.createdAt).toLocaleDateString()}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
          <div style={{ textAlign: 'right' }}>
            <Modal
              header="Refresh Password"
              buttonContent="Refresh Password"
              buttonSize="large"
              windowStyle={{ maxWidth: '500px' }}
            >
              <RefreshPassword />
            </Modal>
          </div>
          <Footer />
        </Container>
      );
    }}
  </Query>
);

export default Profile;
