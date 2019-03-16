import mongoose from 'mongoose';
import '../../../models/Task';
import config from '../../../config/config';

const TaskModel = mongoose.model('Task');

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
      return new TaskModel({
        URL, tagPaths, freq, city, country,
      }).save();
    },
    async removeTarget(parent, { URL }) {
      const targets = await TaskModel.find({ URL });
      await TaskModel.deleteMany({ URL });
      return targets[0];
    },
    async updateTarget(parent, {
      URL, tagPaths, freq, city, country,
    }) {
      const updatedTarget = await TaskModel.findOne({ URL });
      await updatedTarget.update({
        tagPaths, freq, city, country,
      });
      return updatedTarget;
    },
  },
};
