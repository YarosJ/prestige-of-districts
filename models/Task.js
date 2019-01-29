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

/**
 * NEED ADAPTER!!!
 */

TaskSchema.post('save', (doc) => {
  global.taskScheduler.addTasks([{
    body: {
      URL: doc.URL,
      tagPath: doc.tagPath,
    },
    interval: doc.dataListeners[0].freq,
  }]);
});

TaskSchema.post('remove', (doc) => {
  global.taskScheduler.deleteTasks([{
    URL: doc.URL,
    tagPath: doc.tagPath,
  }]);
});

export default mongoose.model('Task', TaskSchema);
