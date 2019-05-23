import debug from 'debug';
import { Failure, FailureModel } from '../../../models/Failure';
import geocodeLocations from '../../../helpers/geolocation/geocodeLocations';
import validate from './partials/validateQuery';
import ISODate from '../../../helpers/ISODate';
import dateQueryFromRange from './partials/dateQueryFromRange';

const debugFailures = debug('failuresController');

/**
 * Failures resolver
 * Accepts input and converts it to commands for the failures model
 */

const failureResolver = {
  Query: {

    /**
     * Returns failures filtered by given params
     */

    async failures(parent, {
      latitude, longitude, services, failureType, locRange, locType, dateRange,
    }): Promise <Failure[]> {
      const happenedAt = dateQueryFromRange(dateRange);

      if (!locRange) {
        return FailureModel.find({
          happenedAt,
          service: validate(services ? { $in: services } : null),
          failureType: validate(failureType),
          'locations.latitude': latitude || { $type: 'number' },
          'locations.longitude': longitude || { $type: 'number' },
          'locations.locType': validate(locType),
        }, null, { sort: { happenedAt: 1 } });
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
      }, null, { sort: { happenedAt: 1 } });
    },
  },
  Mutation: {

    /**
     *  Creates new failure by given params
     */

    async addFailure(parent, {
      country, city, locations, failureType, service, text, date,
    }): Promise <Failure> {
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
      debugFailures('➕ Added new failure:', addedFailure);

      return addedFailure;
    },

    /**
     * Deletes failure by id or another given params
     */

    async removeFailure(parent, {
      date, latitude, longitude, id, locType,
    }): Promise <Failure> {
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

      return failure;
    },
  },
};

export default failureResolver;
