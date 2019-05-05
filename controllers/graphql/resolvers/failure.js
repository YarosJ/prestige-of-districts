import mongoose from 'mongoose';
import { PubSub } from 'apollo-server-express';
import geocodeLocations from '../../../helpers/geolocation/geocodeLocations';
import validate from '../../../helpers/graphQL/validateInput';
import ISODate from '../../../helpers/ISODate';
import dateQueryFromRange from './partials/dateQueryFromRange';
import '../../../models/Failure';

const FailureModel = mongoose.model('Failure');
const pubSub = new PubSub();

export default {
  Query: {
    async failures(parent, {
      latitude, longitude, services, failureType, locRange, locType, dateRange,
    }) {
      const happenedAt = dateQueryFromRange(dateRange);
      if (!locRange) {
        return FailureModel.find({
          happenedAt,
          service: validate(services ? { $in: services } : null),
          failureType: validate(failureType),
          'locations.latitude': latitude || { $type: 'number' },
          'locations.longitude': longitude || { $type: 'number' },
          'locations.locType': validate(locType),
        }, null, { sort: { date: -1 } });
      }
      const {
        maxLatitude, minLatitude, maxLongitude, minLongitude,
      } = locRange;
      return FailureModel.find({
        happenedAt,
        service: validate(services ? { $in: services } : null),
        failureType: validate(failureType),
        'locations.latitude': { $lte: maxLatitude, $gte: minLatitude },
        'locations.longitude': { $lte: maxLongitude, $gte: minLongitude },
        'locations.locType': validate(locType),
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
      console.log('failure', addedFailure, locations);
      pubSub.publish('FAILURE_ADDED', { failureAdded: addedFailure });
      return addedFailure;
    },
    async removeFailure(parent, {
      date, latitude, longitude, id, locType,
    }) {
      let failure;
      if (id) {
        failure = await FailureModel.findById(id);
        await failure.remove();
      } else {
        if (!date) throw new Error('Date field must be provided!');
        const query = {
          happenedAt: ISODate(date),
          'locations.latitude': latitude,
          'locations.longitude': longitude,
          'locations.locType': validate(locType),
        };
        failure = await FailureModel.findOne(query);
        await FailureModel.deleteMany(query);
      }
      pubSub.publish('FAILURE_REMOVED', { failureRemoved: failure });
      return failure;
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
