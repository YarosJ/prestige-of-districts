// noinspection ES6CheckImport
import { assert } from 'chai';
import { describe } from 'mocha';
import schemas from './schemas';
import gqlResErrPartial from '../gqlResErrPartial';

const reqSchemas = schemas; // I don't know why another way I get "reqSchemas not defined error"
const {
  GET_MESSAGE, ADD_MESSAGE, REMOVE_MESSAGE,
} = reqSchemas;

const date = '2019.01.01';
let geoLocation = {};

export default async ({ query, mutate }) => {
  const addMessageMutation = () => mutate({
    mutation: ADD_MESSAGE,
    variables: {
      date,
      country: 'Ukraine',
      city: 'Kiev',
      locations: ['Киев', 'Киевской области'],
      service: 'WATER',
      text: 'Киев — административный центр Киевской области',
    },
  });

  describe('message', () => {
    describe('add', () => {
      // eslint-disable-next-line no-undef
      it('without errors', async () => {
        const addMessageRes = await addMessageMutation();
        gqlResErrPartial(addMessageRes, assert, (resp) => {
          // eslint-disable-next-line prefer-destructuring
          geoLocation = resp.addMessage.locations[0];
        });
      });

      // eslint-disable-next-line no-undef
      it('response have locations', () => {
        // eslint-disable-next-line no-unused-expressions
        geoLocation
          ? assert.isOk('everything')
          : assert.fail('Location in message must be provided!');
      });
    });

    describe('get', () => {
      describe('with range', () => {
        let response;
        // eslint-disable-next-line no-undef
        it('without errors', async () => {
          const { latitude, longitude } = geoLocation;
          const getMessageRes = await query({
            query: GET_MESSAGE,
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
          gqlResErrPartial(getMessageRes, assert, (resp) => {
            response = resp;
          });
        });

        // eslint-disable-next-line no-undef
        it('messages was found', async () => {
          assert(response.messages.length > 0, "messages wasn't found");
        });
      });

      describe('with certain coordinates', () => {
        let response;
        // eslint-disable-next-line no-undef
        it('without errors', async () => {
          const { latitude, longitude } = geoLocation;
          const getMessageRes = await query({
            query: GET_MESSAGE,
            variables: {
              latitude,
              longitude,
              date,
            },
          });
          gqlResErrPartial(getMessageRes, assert, (resp) => {
            response = resp;
          });
        });

        // eslint-disable-next-line no-undef
        it('messages was found', async () => {
          assert(response.messages.length > 0, "messages wasn't found");
        });
      });
    });

    describe('remove', () => {
      // eslint-disable-next-line no-undef
      it('by date, latitude, longitude without errors', async () => {
        const { latitude, longitude } = geoLocation;
        const removeMessageRes = await mutate({
          mutation: REMOVE_MESSAGE,
          variables: { date, latitude, longitude },
        });
        gqlResErrPartial(removeMessageRes, assert);
      });

      // eslint-disable-next-line no-undef
      it('by id without errors', async () => {
        // Add new message and get id
        const addMessageRes = await addMessageMutation();
        const { id } = addMessageRes.data.addMessage;

        // Remove by id message
        const removeMessageRes = await mutate({
          mutation: REMOVE_MESSAGE,
          variables: { id },
        });
        gqlResErrPartial(removeMessageRes, assert);
      });
    });
  });
};
