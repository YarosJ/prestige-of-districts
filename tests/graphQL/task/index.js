// noinspection ES6CheckImport
import { assert } from 'chai';
import { describe } from 'mocha';
import schemas from './schemas';
import gqlResErrPartial from '../gqlResErrPartial';

const reqSchemas = schemas; // I don't know why another way I get "reqSchemas not defined error"
const {
  GET_TAGS, ADD_TARGET, REMOVE_TARGET, UPDATE_TARGET,
} = reqSchemas;

export default async ({ query, mutate }) => {
  describe('task', () => {
    // eslint-disable-next-line no-undef
    it('get target', async () => {
      const getTargetRes = await query({ query: GET_TAGS });
      gqlResErrPartial(getTargetRes, assert);
    });

    // eslint-disable-next-line no-undef
    it('add target', async () => {
      const addTargetRes = await mutate({
        mutation: ADD_TARGET,
        variables: {
          URL: 'www.testSite.com',
          freq: 4000,
        },
      });
      gqlResErrPartial(addTargetRes, assert);
    });

    // eslint-disable-next-line no-undef
    it('update target', async () => {
      const updateTargetRes = await mutate({
        mutation: UPDATE_TARGET,
        variables: {
          URL: 'www.testSite.com',
          freq: 1000,
          city: 'TestCity',
        },
      });
      gqlResErrPartial(updateTargetRes, assert);
    });

    // eslint-disable-next-line no-undef
    it('remove target', async () => {
      const removeTargetRes = await mutate({
        mutation: REMOVE_TARGET,
        variables: { URL: 'www.testSite.com' },
      });
      gqlResErrPartial(removeTargetRes, assert);
    });
  });
};
