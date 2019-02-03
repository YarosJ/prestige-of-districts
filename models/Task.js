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
  tagPaths: [String],
  freq: {
    type: Number,
    required: false,
  },
  dataListeners: [String],
}, { usePushEach: true });

/**
 * NEED ADAPTER!!!
 */

TaskSchema.post('save', (doc) => {
  global.taskScheduler.addTasks([{
    body: {
      URL: doc.URL,
      tagPaths: doc.tagPaths,
    },
    interval: doc.freq,
  }]);
});

TaskSchema.post('remove', (doc) => {
  global.taskScheduler.deleteTasks([{
    URL: doc.URL,
    tagPaths: doc.tagPaths,
  }]);
});

export default mongoose.model('Task', TaskSchema);
