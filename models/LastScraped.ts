import * as mongoose from 'mongoose';

mongoose.Promise = require('bluebird');

const { Schema } = mongoose;

/**
 * @description :: A model definition. Represents a database of last scraped text messages.
 * @type {*|Mongoose.Schema}
 */

const LastScrapedSchema = new Schema({
  text: [String],
  dateToDelete: {
    required: true,
    type: Date,
    default: Date.now,
  },
}, { usePushEach: true });

export default mongoose.model('LastScraped', LastScrapedSchema);
