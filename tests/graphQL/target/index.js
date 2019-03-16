import { describe } from 'mocha';
import { assert } from 'chai';
import reqSchemas from './reqSchemas';

const schemas = reqSchemas; // I don't know why another way I get "reqSchemas not defined error"
const {
  GET_TAGS, ADD_TARGET, REMOVE_TARGET, UPDATE_TARGET,
} = schemas;

const gqlResErrPartial = (res, _assert) => {
  const { errors } = res;
  if (errors) {
    errors.forEach(e => _assert.fail(e));
  } else _assert.isOk('everything');
};

export default async ({ query, mutate }) => {
  describe('target', () => {
    // eslint-disable-next-line no-undef
    it('get target', async () => {
      const getUserRes = await query({ query: GET_TAGS });
      gqlResErrPartial(getUserRes, assert);
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
