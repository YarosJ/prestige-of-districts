// noinspection ES6CheckImport
import { assert } from 'chai';
import { describe } from 'mocha';
import schemas from './schemas';
import gqlResErrPartial from '../gqlResErrPartial';

const reqSchemas = schemas; // I don't know why another way I get "reqSchemas not defined error"
const {
  GET_FAILURE, ADD_FAILURE, REMOVE_FAILURE,
} = reqSchemas;

const date = '2019.01.01';
let geoLocation = {};

export default async ({ query, mutate }) => {
  describe('failure', () => {
    describe('add', () => {
    // eslint-disable-next-line no-undef
      it('without errors', async () => {
        const addFailureRes = await mutate({
          mutation: ADD_FAILURE,
          variables: {
            date,
            country: 'Ukraine',
            city: 'Kiev',
            locations: ['Киев', 'Киевской области'],
            failureType: 'FAULT',
            service: 'WATER',
            text: 'Киев — административный центр Киевской области',
          },
        });
        gqlResErrPartial(addFailureRes, assert, (resp) => {
          geoLocation = resp.addFailure.locations[0];
        });
      });

      // eslint-disable-next-line no-undef
      it('response have locations', () => {
      // eslint-disable-next-line no-unused-expressions
        geoLocation
          ? assert.isOk('everything')
          : assert.fail('Location in failure must be provided!');
      });
    });

    describe('get', () => {
      describe('with range', () => {
        let response;
        // eslint-disable-next-line no-undef
        it('without errors', async () => {
          const { latitude, longitude } = geoLocation;
          const getFailureRes = await query({
            query: GET_FAILURE,
            variables: {
              date,
              range: {
                maxLatitude: latitude + 10.0001,
                minLatitude: latitude - 10.0001,
                maxLongitude: longitude + 10.0001,
                minLongitude: longitude - 10.0001,
              },
            },
          });
          gqlResErrPartial(getFailureRes, assert, (resp) => {
            response = resp;
          });
        });

        // eslint-disable-next-line no-undef
        it('failures was found', async () => {
          assert(response.failures.length > 0, "failures wasn't found");
        });
      });

      describe('with certain coordinates', () => {
        let response;
        // eslint-disable-next-line no-undef
        it('without errors', async () => {
          const { latitude, longitude } = geoLocation;
          const getFailureRes = await query({
            query: GET_FAILURE,
            variables: {
              latitude,
              longitude,
              date,
            },
          });
          gqlResErrPartial(getFailureRes, assert, (resp) => {
            response = resp;
          });
        });

        // eslint-disable-next-line no-undef
        it('failures was found', async () => {
          assert(response.failures.length > 0, "failures wasn't found");
        });
      });
    });

    describe('remove', () => {
    // eslint-disable-next-line no-undef
      it('without errors', async () => {
        const { latitude, longitude } = geoLocation;
        const removeFailureRes = await mutate({
          mutation: REMOVE_FAILURE,
          variables: { date, latitude, longitude },
        });
        gqlResErrPartial(removeFailureRes, assert);
      });
    });
  });
};
