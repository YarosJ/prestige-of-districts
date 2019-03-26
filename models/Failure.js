import mongoose from 'mongoose';

mongoose.Promise = require('bluebird');

const { Schema } = mongoose;

/**
 * @description :: A model definition. Represents a database failures.
 * @type {*|Mongoose.Schema}
 */

const FailureSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  service: {
    type: String,
    required: true,
  },
  failureType: {
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

export default mongoose.model('Failure', FailureSchema);
