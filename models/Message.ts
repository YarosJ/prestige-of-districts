import * as mongoose from 'mongoose';

mongoose.Promise = require('bluebird');

const { Schema } = mongoose;

/**
 * @description :: A model definition. Represents a database messages.
 * @type {*|Mongoose.Schema}
 */

const MessageSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  service: {
    type: String,
    required: true,
  },
  locations: [{
    place: String,
    latitude: Number,
    longitude: Number,
    locType: String,
  }],
  happenedAt: {
    required: true,
    type: Date,
    default: Date.now,
  },
}, { usePushEach: true });

export default mongoose.model('Message', MessageSchema);
