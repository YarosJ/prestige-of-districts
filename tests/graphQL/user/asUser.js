// noinspection ES6CheckImport
import { assert } from 'chai';
import { describe } from 'mocha';
import schemas from './schemas';
import userVars from './userVars';
import gqlResErrPartial from '../gqlResErrPartial';

const reqSchemas = schemas; // I don't know why another way I get "reqSchemas not defined error"
const {
  GET_USER, SIGN_UP, SIGN_IN, REFRESH_TOKEN,
} = reqSchemas;

export default async ({ query, mutate }) => {
  let signInResponse = {};

  const signUpMutation = () => mutate({
    mutation: SIGN_UP,
    variables: userVars,
  });

  const signInMutation = () => mutate({
    mutation: SIGN_IN,
    variables: userVars,
  });

  describe('as user', () => {
    describe('signUp', () => {
      // eslint-disable-next-line no-undef
      it('without errors', async () => {
        const signUpRes = await signUpMutation();
        gqlResErrPartial(signUpRes, assert);
      });
    });

    describe('signIn', () => {
      // eslint-disable-next-line no-undef
      it('without errors', async () => {
        const signInRes = await signInMutation();
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

    describe('refreshToken', () => {
      // eslint-disable-next-line no-undef
      it('without errors', async () => {
        const { accessToken, refreshToken } = signInResponse;
        const refreshTokenRes = await mutate({
          mutation: REFRESH_TOKEN,
          variables: { accessToken, refreshToken },
        });
        gqlResErrPartial(refreshTokenRes, assert, (resp) => {
          signInResponse = { id: signInResponse.user.id, ...resp.refreshToken };
        });
      });
    });

    describe('get user', () => {
      let userResponse = {};
      // eslint-disable-next-line no-undef
      it('without errors', async () => {
        const { accessToken, id } = signInResponse;
        const getUserRes = await query({
          query: GET_USER,
          variables: { accessToken, id },
        });
        gqlResErrPartial(getUserRes, assert, (resp) => {
          userResponse = resp.user;
        });
      });

      // eslint-disable-next-line no-undef
      it('correct response', async () => {
        assert(userResponse.id, 'response incorrect');
      });
    });
  });
};
