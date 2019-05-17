import * as mongoose from 'mongoose';
import '../../../models/Task';
import * as config from '../../../config/config.json';

const TaskModel = mongoose.model('Task');

export default {
  Query: {
    tags(): string[] {
      return config.NLP.supportedEntities;
    },
    services(): string[] {
      return config.NLP.services;
    },
    targets(): object[] {
      return TaskModel.find();
    },
  },
  Mutation: {
    async addTarget(parent, {
      URL, tagPaths, freq, city, country, service,
    }): Promise <object> {
      return new TaskModel({
        URL, tagPaths, freq, city, country, service,
      }).save();
    },
    async removeTarget(parent, { URL }): Promise <object> {
      const targets = await TaskModel.find({ URL });
      await TaskModel.deleteMany({ URL });
      return targets[0];
    },
    async updateTarget(parent, {
      URL, tagPaths, freq, city, country,
    }): Promise <object> {
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
