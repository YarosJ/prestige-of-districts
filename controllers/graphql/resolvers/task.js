import mongoose from 'mongoose';
import { PubSub } from 'apollo-server-express';
import '../../../models/Task';

const TaskModel = mongoose.model('Task');
const pubSub = new PubSub();

export default {
  Query: {
    tags() {
      return ['LOC']; // From config
    },
  },
  Mutation: {
    async addTarget(parent, {
      URL, tagPaths, freq, dataListeners,
    }) {
      const addedTarget = await new TaskModel({
        URL, tagPaths, freq, dataListeners,
      }).save();
      pubSub.publish('TARGET_ADDED', { targetAdded: addedTarget });
      return addedTarget;
    },
    async addListeners(parent, { URL, dataListeners }) {
      const task = await TaskModel.findOne({ URL });
      await task.dataListeners.push(...dataListeners);
      const addedListeners = await task.save();
      pubSub.publish('LISTENER_ADDED', { listenersAdded: addedListeners });
      return addedListeners;
    },
    async removeTarget(parent, { URL }) {
      const removedTarget = await TaskModel.findOne({ URL });
      await removedTarget.remove();
      pubSub.publish('TARGET_REMOVED', { targetRemoved: removedTarget });
      return removedTarget;
    },
    async removeListeners(parent, { URL, dataListeners }) {
      const task = await TaskModel.findOne({ URL });
      task.dataListeners = await task.dataListeners
        .filter(dataListener => !dataListeners.find(dataListener));
      const removedListeners = await task.save();
      pubSub.publish('LISTENER_REMOVED', { listenersRemoved: removedListeners });
      return removedListeners;
    },
    async updateListener(parent, {
      URL, tagPaths, freq, dataListeners,
    }) {
      const updatedListener = await TaskModel.findOneAndUpdate(
        { URL },
        { tagPaths, freq, dataListeners },
        { new: true },
      );
      pubSub.publish('LISTENER_UPDATED', { listenerUpdated: updatedListener });
      return updatedListener;
    },
  },
  Subscription: {
    targetAdded: {
      subscribe: () => pubSub.asyncIterator(['TARGET_ADDED']),
    },
    targetRemoved: {
      subscribe: () => pubSub.asyncIterator(['TARGET_REMOVED']),
    },
    listenersAdded: {
      subscribe: () => pubSub.asyncIterator(['LISTENERS_ADDED']),
    },
    listenersRemoved: {
      subscribe: () => pubSub.asyncIterator(['LISTENERS_REMOVED']),
    },
    listenerUpdated: {
      subscribe: () => pubSub.asyncIterator(['LISTENER_UPDATED']),
    },
  },
};
