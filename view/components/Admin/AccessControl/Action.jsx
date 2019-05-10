import React from 'react';
import { Icon, Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import DeleteRoleAction from './DeleteRoleAction';
import { rolePropType } from '../../../constants/propTypes';

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

Action.propTypes = {
  role: rolePropType,
  action: PropTypes.string,
};

Action.defaultProps = {
  role: {
    role: null,
    actions: [],
  },
  action: null,
};

export default Action;
