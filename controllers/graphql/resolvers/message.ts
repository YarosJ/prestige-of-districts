import * as mongoose from 'mongoose';
import debug from 'debug';
import { PubSub } from 'apollo-server-express';
import geocodeLocations from '../../../helpers/geolocation/geocodeLocations';
import validate from '../../../helpers/graphQL/validateInput';
import ISODate from '../../../helpers/ISODate';
import dateQueryFromRange from './partials/dateQueryFromRange';
import '../../../models/Message';

const MessageModel = mongoose.model('Message');
const pubSub = new PubSub();
const debugMessages = debug('messagesController');

export default {
  Query: {
    async messages(parent, {
      latitude, longitude, service, locRange, locType, dateRange,
    }) {
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
    async addMessage(parent, {
      country, city, locations, service, text, date,
    }) {
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
      pubSub.publish('MESSAGE_ADDED', { messageAdded: addedMessage });
      return addedMessage;
    },
    async removeMessage(parent, {
      date, latitude, longitude, id, locType,
    }) {
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
      pubSub.publish('MESSAGE_REMOVED', { messageRemoved: message });
      return message;
    },
  },
  Subscription: {
    messageAdded: {
      subscribe: () => pubSub.asyncIterator(['MESSAGE_ADDED']),
    },
    messageRemoved: {
      subscribe: () => pubSub.asyncIterator(['MESSAGE_REMOVED']),
    },
  },
};
