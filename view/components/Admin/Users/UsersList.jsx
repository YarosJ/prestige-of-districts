import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import User from './User';

const cellColor = '#2185d0';

const UsersList = ({ users, limit, cursor }) => (
  <Table basic="very" style={{ padding: '5%' }}>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell
          style={{ color: cellColor }}
        >
          Email
        </Table.HeaderCell>
        <Table.HeaderCell
          style={{ color: cellColor }}
        >
          Role
        </Table.HeaderCell>
        <Table.HeaderCell
          style={{
            textAlign: 'center',
            color: cellColor,
          }}
        >
          Delete user
        </Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      {users.map(user => (
        <User user={user} limit={limit} cursor={cursor} key={user.id} />
      ))}
    </Table.Body>
  </Table>
);

UsersList.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    email: PropTypes.string,
    role: PropTypes.string,
    id: PropTypes.string,
  })),
  limit: PropTypes.number,
  cursor: PropTypes.number,
};

UsersList.defaultProps = {
  users: [],
  limit: 15,
  cursor: 0,
};

export default UsersList;
