import mongoose from 'mongoose';
import { PubSub } from 'apollo-server-express';
import geocodeLocations from '../../../helpers/geolocation/geocodeLocations';
import '../../../models/Failure';

const FailureModel = mongoose.model('Failure');
const pubSub = new PubSub();

export default {
  Query: {
    async failures({
      latitude, longitude, service, failureType, date, range,
    }) {
      if (!range) {
        return FailureModel.find({
          date,
          service,
          failureType,
          locations: { latitude, longitude },
        });
      }
      const {
        maxLatitude, minLatitude, maxLongitude, minLongitude,
      } = range;
      return FailureModel.find({
        date,
        service,
        failureType,
        'locations.latitude': { $lte: maxLatitude, $gte: minLatitude },
        'locations.longitude': { $lte: maxLongitude, $gte: minLongitude },
      });
    },
  },
  Mutation: {
    async addFailure(parent, {
      country, city, locations, failureType, service, text,
    }) {
      // Geocode
      const geoLocated = await geocodeLocations(locations, country, city);
      // Write to DB
      console.log('FAILURE', {
        geoLocated, text, service, failureType,
      });
      // const addedFailure = await new FailureModel({
      //   locations: geoLocated, text, service, failureType,
      // }).save();
      // pubSub.publish('FAILURE_ADDED', { failureAdded: addedFailure });
      // return addedFailure;
    },
    async removeFailure(parent, { date }) {
      const removedFailure = await FailureModel.findOne({ date });
      await removedFailure.remove();
      pubSub.publish('FAILURE_REMOVED', { failureRemoved: removedFailure });
      return removedFailure;
    },
  },
  Subscription: {
    failureAdded: {
      subscribe: () => pubSub.asyncIterator(['FAILURE_ADDED']),
    },
    failureRemoved: {
      subscribe: () => pubSub.asyncIterator(['FAILURE_REMOVED']),
    },
  },
};
