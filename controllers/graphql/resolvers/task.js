import mongoose from 'mongoose';
import '../../../models/Task';
import config from '../../../config/config';

const TaskModel = mongoose.model('Task');

export default {
  Query: {
    tags() {
      return config.NLP.supportedEntities;
    },
    targets() {
      return TaskModel.find();
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
      const oldTarget = await TaskModel.findOne({ URL });
      return TaskModel.findOneAndUpdate({ URL }, {
        tagPaths: tagPaths || oldTarget.tagPaths,
        freq: freq || oldTarget.freq,
        city: city || oldTarget.city,
        country: country || oldTarget.country,
      }, { new: true });
    },
  },
};
