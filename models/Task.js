import mongoose from 'mongoose';
// import { messageBroker } from '../config/config';

mongoose.Promise = require('bluebird');

const { Schema } = mongoose;
// const { PARSER_QUEUE_NAME } = messageBroker;

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

TaskSchema.post('save', doc => {
  console.log('--------------', typeof global.taskScheduler, '--------------');
  global.taskScheduler.addTasks([doc]);
});

TaskSchema.post('remove', (doc) => {
  console.log('--------------', typeof global.taskScheduler, '--------------');
  global.taskScheduler.deleteTasks([doc.URL]);
});

export default mongoose.model('Task', TaskSchema);
