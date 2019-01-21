import mongoose from 'mongoose';

mongoose.Promise = require('bluebird');

const { Schema } = mongoose;

/**
 * @description :: A model definition. Represents a database changes.
 * @type {*|Mongoose.Schema}
 */

const ChangeSchema = new Schema({
  addTask: [String],
  removeTask: [String],
  updateTask: [String],
}, { usePushEach: true });

export default mongoose.model('Change', ChangeSchema);
