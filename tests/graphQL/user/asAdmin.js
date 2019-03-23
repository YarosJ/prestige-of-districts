// noinspection ES6CheckImport
import { assert } from 'chai';
import { describe } from 'mocha';
// noinspection ES6CheckImport
import { admin } from '../../../config/config';
import schemas from './schemas';
import gqlResErrPartial from '../gqlResErrPartial';
import userVars from './userVars';

const reqSchemas = schemas; // I don't know why another way I get "reqSchemas not defined error"
const {
  GET_USERS, GET_USER, SIGN_IN, UPDATE_USER, DELETE_USER,
} = reqSchemas;

export default async ({ query, mutate }) => {
  let signInResponse = {};

  const signInMutation = variables => mutate({
    mutation: SIGN_IN,
    variables,
  });

  describe('as admin', () => {
    describe('signIn', () => {
      // eslint-disable-next-line no-undef
      it('without errors', async () => {
        const signInRes = await signInMutation(admin);
        gqlResErrPartial(signInRes, assert, (resp) => {
          signInResponse = resp.signIn;
        });
      });

      // eslint-disable-next-line no-undef
      it('correct response', async () => {
        const { accessToken, refreshToken } = signInResponse;
        assert(accessToken && refreshToken, 'response incorrect');
      });
    });

    describe('getUsers', () => {
      // eslint-disable-next-line no-undef
      it('without errors', async () => {
        const { accessToken } = signInResponse;
        const getUsersRes = await query({
          query: GET_USERS,
          variables: {
            accessToken,
            cursor: 0,
            limit: 10,
          },
        });
        gqlResErrPartial(getUsersRes, assert);
      });
    });

    describe('update user', async () => {
      let notUpdatedUser = null;
      let updatedUser = null;

      // eslint-disable-next-line no-undef
      it('without errors', async () => {
        const { accessToken } = signInResponse;
        const signed = await signInMutation(userVars);
        notUpdatedUser = signed.data.signIn.user;
        const updateRes = await mutate({
          mutation: UPDATE_USER,
          variables: {
            accessToken,
            id: notUpdatedUser.id,
            role: 'admin',
          },
        });
        gqlResErrPartial(updateRes, assert, (resp) => {
          updatedUser = resp.updateUser;
        });
      });

      // eslint-disable-next-line no-undef
      it('role updated', async () => {
        assert(updatedUser.role === 'admin', 'role not updated');
      });

      // eslint-disable-next-line no-undef
      it('password updated', async () => {
        const { accessToken } = signInResponse;
        const signed = await signInMutation(userVars);
        notUpdatedUser = signed.data.signIn.user;
        const updateRes = await mutate({
          mutation: UPDATE_USER,
          variables: {
            accessToken,
            id: notUpdatedUser.id,
            previousPassword: userVars.password,
            newPassword: 'newPassword123',
          },
        });
        gqlResErrPartial(updateRes, assert);
      });
    });

    describe('delete user', async () => {
      let id = null;
      // eslint-disable-next-line no-undef
      it('without errors', async () => {
        const { accessToken } = signInResponse;
        const signed = await signInMutation(userVars);
        // eslint-disable-next-line prefer-destructuring
        id = signed.data.signIn.user.id;
        const deleteRes = await mutate({
          mutation: DELETE_USER,
          variables: { accessToken, id },
        });
        gqlResErrPartial(deleteRes, assert);
      });

      // eslint-disable-next-line no-undef
      it('user deleted', async () => {
        const { accessToken } = signInResponse;
        const getUserRes = await query({
          query: GET_USER,
          variables: { accessToken, id },
        });
        assert(!getUserRes.data.user, 'not deleted');
      });
    });
  });
};
