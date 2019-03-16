import mongoose from 'mongoose';

mongoose.Promise = require('bluebird');

const { Schema } = mongoose;

/**
 * @description :: A model definition. Represents a database messages.
 * @type {*|Mongoose.Schema}
 */

const MessageSchema = new Schema({
  text: String,
  service: String,
  locations: [{
    latitude: Number,
    longitude: Number,
  }],
}, { usePushEach: true });

export default mongoose.model('Message', MessageSchema);
