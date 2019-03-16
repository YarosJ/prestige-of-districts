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
  city: {
    type: String,
    required: false,
  },
  country: {
    type: String,
    required: false,
  },
}, { usePushEach: true });

/**
 * NEED ADAPTER!!!
 */

TaskSchema.post('save', (doc) => {
  if (global.taskScheduler) {
    global.taskScheduler.addTasks([{
      body: {
        URL: doc.URL,
        tagPaths: doc.tagPaths,
        city: doc.city,
        country: doc.country,
      },
      interval: doc.freq,
    }]);
  }
});

TaskSchema.post('remove', (doc) => {
  if (global.taskScheduler) {
    global.taskScheduler.deleteTasks([{
      URL: doc.URL,
      tagPaths: doc.tagPaths,
      city: doc.city,
      country: doc.country,
    }]);
  }
});

export default mongoose.model('Task', TaskSchema);
