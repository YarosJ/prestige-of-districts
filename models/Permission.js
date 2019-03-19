import mongoose from 'mongoose';

mongoose.Promise = require('bluebird');

const { Schema } = mongoose;

/**
 * @description :: A model definition.  Represents a database for permissions.
 * @type {*|Mongoose.Schema}
 */

const PermissionSchema = new Schema({
  role: {
    type: String,
    required: true,
    unique: true,
  },
  actions: [{
    type: String,
    unique: false,
  }],
}, { usePushEach: true });

export default mongoose.model('Permission', PermissionSchema);
