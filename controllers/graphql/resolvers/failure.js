import mongoose from 'mongoose';
import { PubSub } from 'apollo-server-express';
import geocodeLocations from '../../../helpers/geolocation/geocodeLocations';
import validate from '../../../helpers/graphQL/validateInput';
import ISODate from '../../../helpers/ISODate';
import '../../../models/Failure';

const FailureModel = mongoose.model('Failure');
const pubSub = new PubSub();

export default {
  Query: {
    async failures(parent, {
      latitude, longitude, service, failureType, date, range, locType,
    }) {
      const dateISO = date ? new Date(date).toISOString() : /./;
      if (!range) {
        return FailureModel.find({
          happenedAt: dateISO,
          service: validate(service),
          failureType: validate(failureType),
          'locations.latitude': latitude,
          'locations.longitude': longitude,
          'locations.locType': validate(locType),
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
      console.log('failure', addedFailure);
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
