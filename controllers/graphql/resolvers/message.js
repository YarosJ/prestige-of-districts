import mongoose from 'mongoose';
import { PubSub } from 'apollo-server-express';
import geocodeLocations from '../../../helpers/geolocation/geocodeLocations';
import validate from '../../../helpers/graphQL/validateInput';
import ISODate from '../../../helpers/ISODate';
import '../../../models/Message';

const MessageModel = mongoose.model('Message');
const pubSub = new PubSub();

export default {
  Query: {
    async messages(parent, {
      latitude, longitude, service, date, locRange, locType,
    }) {
      const dateISO = date ? new Date(date).toISOString() : /./;
      if (!locRange) {
        return MessageModel.find({
          happenedAt: dateISO,
          service: validate(service),
          'locations.latitude': latitude,
          'locations.longitude': longitude,
          'locations.locType': validate(locType),
        });
      }
      const {
        maxLatitude, minLatitude, maxLongitude, minLongitude,
      } = locRange;
      return MessageModel.find({
        happenedAt: dateISO,
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
      console.log('message', addedMessage, locations, text);
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
