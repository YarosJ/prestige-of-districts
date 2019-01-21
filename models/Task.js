import mongoose from 'mongoose';

mongoose.Promise = require('bluebird');

const { Schema } = mongoose;

/**
 * @description :: A model definition. Represents a database tasks.
 * @type {*|Mongoose.Schema}
 */

const TaskSchema = new Schema({
  URL: {
    type: String,
    required: true,
  },
  dataListeners: [
    {
      tags: [String],
      dataListener: String,
      freq: {
        type: Number,
        required: false,
      },
    },
  ],
}, { usePushEach: true });

TaskSchema.post('save', async (doc) => {
  // ===> Changes ++ addTask
});

TaskSchema.post('remove', async (doc) => {
  // ==> Changes ++ removeTask
});

TaskSchema.post('update', async (doc) => {
  // ==> Changes ++ updateTask
});

export default mongoose.model('Task', TaskSchema);
