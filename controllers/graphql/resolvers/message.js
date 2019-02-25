import mongoose from 'mongoose';
import { PubSub } from 'apollo-server-express';
import '../../../models/Message';
import geocodeLocations from '../../../helpers/geolocation/geocodeLocations';

const MessageModel = mongoose.model('Message');
const pubSub = new PubSub();

export default {
  Query: {
    async messages({
      latitude, longitude, date, range,
    }) {
      if (!range) {
        return MessageModel.find({
          date,
          locations: { latitude, longitude },
        });
      }
      const {
        maxLatitude, minLatitude, maxLongitude, minLongitude,
      } = range;
      return MessageModel.find({
        date,
        'locations.latitude': { $lte: maxLatitude, $gte: minLatitude },
        'locations.longitude': { $lte: maxLongitude, $gte: minLongitude },
      });
    },
  },
  Mutation: {
    async addMessage(parent, {
      country, city, text, service,
    }) {
      // Geocode
      const geoLocated = await geocodeLocations(null, country, city);
      // Write to DB
      console.log('INFO', { text, service, geoLocated: geoLocated[0] });
      // const addedMessage = await new MessageModel({
      //  text,
      //  service,
      //  locations: geoLocated,
      // }).save();
      // pubSub.publish('MESSAGE_ADDED', { messageAdded: addedMessage });
      // return addedMessage;
    },
    async removeMessage(parent, {
      latitude, longitude, date,
    }) {
      const removedMessage = await MessageModel.findOne({
        date,
        locations: { latitude, longitude },
      });
      await removedMessage.remove();
      pubSub.publish('MESSAGE_REMOVED', { messageRemoved: removedMessage });
      return removedMessage;
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
