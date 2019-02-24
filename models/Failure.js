import mongoose from 'mongoose';

mongoose.Promise = require('bluebird');

const { Schema } = mongoose;

/**
 * @description :: A model definition. Represents a database messages.
 * @type {*|Mongoose.Schema}
 */

const FailureSchema = new Schema({
  failureType: {
    type: String,
    required: true,
  },
  service: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  locations: [{
    latitude: String,
    longitude: String,
  }],
}, { usePushEach: true });

export default mongoose.model('Failure', FailureSchema);
