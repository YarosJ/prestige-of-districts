// noinspection ES6CheckImport
import { assert } from 'chai';
import { describe } from 'mocha';
import schemas from './schemas';
import gqlResErrPartial from '../gqlResErrPartial';

const reqSchemas = schemas; // I don't know why another way I get "reqSchemas not defined error"
const {
  GET_ROLES, GET_ACTIONS, ADD_ROLE, ADD_ACTION, DELETE_ROLE, DELETE_ACTION,
} = reqSchemas;

export default async ({ query, mutate }) => {
  describe('permission', () => {
    // eslint-disable-next-line no-undef
    it('add role', async () => {
      const addRoleRes = await mutate({
        mutation: ADD_ROLE,
        variables: {
          role: 'testRole',
          actions: ['testAction1', 'testAction2'],
        },
      });
      gqlResErrPartial(addRoleRes, assert);
    });

    // eslint-disable-next-line no-undef
    it('add action', async () => {
      const addActionRes = await mutate({
        mutation: ADD_ACTION,
        variables: {
          role: 'testRole',
          action: 'testAction3',
        },
      });
      gqlResErrPartial(addActionRes, assert);
    });

    // eslint-disable-next-line no-undef
    it('get roles', async () => {
      const getRolesRes = await query({ query: GET_ROLES });
      gqlResErrPartial(getRolesRes, assert);
    });

    // eslint-disable-next-line no-undef
    it('get actions', async () => {
      const getActionsRes = await query({
        query: GET_ACTIONS,
        variables: { role: 'testRole' },
      });
      gqlResErrPartial(getActionsRes, assert);
    });

    // eslint-disable-next-line no-undef
    it('delete action', async () => {
      const deleteActionRes = await mutate({
        mutation: DELETE_ACTION,
        variables: {
          role: 'testRole',
          action: 'testAction2',
        },
      });
      gqlResErrPartial(deleteActionRes, assert);
    });

    // eslint-disable-next-line no-undef
    it('delete role', async () => {
      const deleteRoleRes = await mutate({
        mutation: DELETE_ROLE,
        variables: { role: 'testRole' },
      });
      gqlResErrPartial(deleteRoleRes, assert);
    });
  });
};
