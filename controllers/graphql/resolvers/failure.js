import mongoose from 'mongoose';
import { PubSub } from 'apollo-server-express';
import geocodeLocations from '../../../helpers/geolocation/geocodeLocations';
import ISODate from '../../../helpers/ISODate';
import '../../../models/Failure';

const FailureModel = mongoose.model('Failure');
const pubSub = new PubSub();
const ALL_REGEXP = /./;
const validate = input => input || ALL_REGEXP;

export default {
  Query: {
    async failures(parent, {
      latitude, longitude, service, failureType, date, range,
    }) {
      const dateISO = date ? new Date(date).toISOString() : ALL_REGEXP;
      if (!range) {
        return FailureModel.find({
          happenedAt: dateISO,
          service: validate(service),
          failureType: validate(failureType),
          'locations.latitude': latitude,
          'locations.longitude': longitude,
        });
      }
      const {
        maxLatitude, minLatitude, maxLongitude, minLongitude,
      } = range;
      return FailureModel.find({
        happenedAt: dateISO,
        service: validate(service),
        failureType: validate(failureType),
        'locations.latitude': { $lte: maxLatitude, $gte: minLatitude },
        'locations.longitude': { $lte: maxLongitude, $gte: minLongitude },
      });
    },
  },
  Mutation: {
    async addFailure(parent, {
      country, city, locations, failureType, service, text, date,
    }) {
      // Geocode
      const geoLocated = await geocodeLocations(locations, country, city);
      // Write to DB
      const addedFailure = await new FailureModel({
        locations: geoLocated,
        text,
        service,
        failureType,
        happenedAt: ISODate(date),
      }).save();
      pubSub.publish('FAILURE_ADDED', { failureAdded: addedFailure });
      return addedFailure;
    },
    async removeFailure(parent, { date, latitude, longitude }) {
      if (!date) throw new Error('Date field must be provided!');
      const query = {
        happenedAt: ISODate(date),
        'locations.latitude': latitude,
        'locations.longitude': longitude,
      };
      const failures = await FailureModel.find(query);
      await FailureModel.deleteMany(query);
      pubSub.publish('FAILURE_REMOVED', { failureRemoved: failures[0] });
      return failures[0];
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
