import mongoose from 'mongoose';
import { PubSub } from 'apollo-server-express';
import '../../../models/Task';
import config from '../../../config/config';

const TaskModel = mongoose.model('Task');
const pubSub = new PubSub();

export default {
  Query: {
    tags() {
      return config.NLP.supportedEntities;
    },
  },
  Mutation: {
    async addTarget(parent, {
      URL, tagPaths, freq, city, country,
    }) {
      const addedTarget = await new TaskModel({
        URL, tagPaths, freq, city, country,
      }).save();
      pubSub.publish('TARGET_ADDED', { targetAdded: addedTarget });
      return addedTarget;
    },
    async removeTarget(parent, { URL }) {
      const removedTarget = await TaskModel.findOne({ URL });
      await removedTarget.remove();
      pubSub.publish('TARGET_REMOVED', { targetRemoved: removedTarget });
      return removedTarget;
    },
    // Update target
  },
  Subscription: {
    targetAdded: {
      subscribe: () => pubSub.asyncIterator(['TARGET_ADDED']),
    },
    targetRemoved: {
      subscribe: () => pubSub.asyncIterator(['TARGET_REMOVED']),
    },
  },
};
