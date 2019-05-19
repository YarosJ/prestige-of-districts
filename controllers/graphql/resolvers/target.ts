import { Task, TaskModel } from '../../../models/Task';
import * as config from '../../../config/config.json';

export default {
  Query: {
    tags(): string[] {
      return config.NLP.supportedEntities;
    },
    services(): string[] {
      return config.NLP.services;
    },
    targets(): Task[] {
      return TaskModel.find();
    },
  },
  Mutation: {
    async addTarget(parent, {
      URL, tagPaths, freq, city, country, service,
    }): Promise <Task> {
      return new TaskModel({
        URL, tagPaths, freq, city, country, service,
      }).save();
    },
    async removeTarget(parent, { URL }): Promise <Task> {
      const targets = await TaskModel.find({ URL });

      await TaskModel.deleteMany({ URL });

      return targets[0];
    },
    async updateTarget(parent, {
      URL, tagPaths, freq, city, country,
    }): Promise <Task> {
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
