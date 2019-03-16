// noinspection ES6CheckImport
import { assert } from 'chai';
import { describe } from 'mocha';
import schemas from './schemas';
import gqlResErrPartial from '../gqlResErrPartial';

const reqSchemas = schemas; // I don't know why another way I get "reqSchemas not defined error"
const {
  GET_FAILURE, ADD_FAILURE, REMOVE_FAILURE,
} = reqSchemas;

export default async ({ query, mutate }) => {
  describe('failure', () => {
    // eslint-disable-next-line no-undef
    it('add failure', async () => {
      const addFailureRes = await mutate({
        mutation: ADD_FAILURE,
        variables: {
          country: 'Ukraine',
          city: 'Kiev',
          locations: ['Киев', 'Киевской области'],
          failureType: 'FAULT',
          service: 'WATER',
          text: 'Киев — административный центр Киевской области',
        },
      });
      gqlResErrPartial(addFailureRes, assert);
    });

    // eslint-disable-next-line no-undef
    it('get failure with range', async () => {
      const getFailureRes = await query({
        query: GET_FAILURE,
        variables: {
          date: '2019.01.01',
          range: {
            maxLatitude: 30.12345,
            minLatitude: 10.12345,
            maxLongitude: 40.12345,
            minLongitude: 20.12345,
          },
        },
      });
      gqlResErrPartial(getFailureRes, assert);
    });

    // eslint-disable-next-line no-undef
    it('get failure with certain coordinates', async () => {
      const getFailureRes = await query({
        query: GET_FAILURE,
        variables: {
          latitude: 30.12345,
          longitude: 40.12345,
          date: '2019.01.01',
        },
      });
      gqlResErrPartial(getFailureRes, assert);
    });

    // eslint-disable-next-line no-undef
    it('remove failure', async () => {
      const removeFailureRes = await mutate({
        mutation: REMOVE_FAILURE,
        variables: { date: '2019.01.01' },
      });
      gqlResErrPartial(removeFailureRes, assert);
    });
  });
};
