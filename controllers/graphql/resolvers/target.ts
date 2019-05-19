import { Target, TargetModel } from '../../../models/Target';
import * as config from '../../../config/config.json';

export default {
  Query: {

    /**
     * Returns all supported entities
     */

    tags(): string[] {
      return config.NLP.supportedEntities;
    },

    /**
     * Returns all supported services
     */

    services(): string[] {
      return config.NLP.services;
    },

    /**
     * Returns all targets
     */

    targets(): Target[] {
      return TargetModel.find();
    },
  },
  Mutation: {

    /**
     * Creates new target (site that will be parsed) by given params
     */

    async addTarget(parent, {
      URL, tagPaths, freq, city, country, service,
    }): Promise <Target> {
      return new TargetModel({
        URL, tagPaths, freq, city, country, service,
      }).save();
    },

    /**
     * Deletes target by given URL
     */

    async removeTarget(parent, { URL }): Promise <Target> {
      const targets = await TargetModel.find({ URL });

      await TargetModel.deleteMany({ URL });

      return targets[0];
    },

    /**
     * Updates target by given URL and params
     */

    async updateTarget(parent, {
      URL, tagPaths, freq, city, country,
    }): Promise <Target> {
      const oldTarget = await TargetModel.findOne({ URL });

      return TargetModel.findOneAndUpdate({ URL }, {
        tagPaths: tagPaths || oldTarget.tagPaths,
        freq: freq || oldTarget.freq,
        city: city || oldTarget.city,
        country: country || oldTarget.country,
      }, { new: true });
    },
  },
};
