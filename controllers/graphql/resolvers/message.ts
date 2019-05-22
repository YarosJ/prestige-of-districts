import debug from 'debug';
import { Message, MessageModel } from '../../../models/Message';
import geocodeLocations from '../../../helpers/geolocation/geocodeLocations';
import validate from './partials/validateQuery';
import ISODate from '../../../helpers/ISODate';
import dateQueryFromRange from './partials/dateQueryFromRange';

const debugMessages = debug('messagesController');

/**
 * Messages resolver.
 * Accepts input and converts it to commands for the messages model.
 */

const messageResolver = {
  Query: {

    /**
     *  Returns messages filtered by given params
     */

    async messages(parent, {
      latitude, longitude, service, locRange, locType, dateRange,
    }): Promise <Message[]> {
      const happenedAt = dateQueryFromRange(dateRange);

      if (!locRange) {
        return MessageModel.find({
          happenedAt,
          service: validate(service),
          'locations.latitude': latitude || { $type: 'number' },
          'locations.longitude': longitude || { $type: 'number' },
          'locations.locType': validate(locType),
        });
      }

      const {
        maxLatitude, minLatitude, maxLongitude, minLongitude,
      } = locRange;

      return MessageModel.find({
        happenedAt,
        service: validate(service),
        'locations.latitude': { $lte: maxLatitude, $gte: minLatitude },
        'locations.longitude': { $lte: maxLongitude, $gte: minLongitude },
        'locations.locType': validate(locType),
      });
    },
  },
  Mutation: {

    /**
     * Creates new message by given params
     */

    async addMessage(parent, {
      country, city, locations, service, text, date,
    }): Promise <Message> {
      // Geocode
      const geoLocated = await geocodeLocations(locations, country, city);
      // Write to DB
      const addedMessage = await new MessageModel({
        locations: geoLocated,
        text,
        service,
        happenedAt: ISODate(date),
      }).save();
      debugMessages('➕ Added new message:', addedMessage);

      return addedMessage;
    },

    /**
     *  Deletes message by id or another given params
     */

    async removeMessage(parent, {
      date, latitude, longitude, id, locType,
    }): Promise <Message> {
      let message;

      if (id) {
        message = await MessageModel.findById(id);
        await message.remove();
      } else {
        if (!date) throw new Error('Date field must be provided!');
        const query = {
          happenedAt: ISODate(date),
          'locations.latitude': latitude,
          'locations.longitude': longitude,
          'locations.locType': validate(locType),
        };
        message = await MessageModel.findOne(query);
        await MessageModel.deleteMany(query);
      }

      return message;
    },
  },
};

export default messageResolver;
