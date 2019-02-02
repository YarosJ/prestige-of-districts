import mongoose from 'mongoose';
import '../models/Task';
import TaskScheduler from '../libs/TaskScheduler';
import { PARSER_QUEUE_NAME } from '../config/config';

const TaskModel = mongoose.model('Task');
const host = 'amqp://localhost';

export default async () => {
  const tasks = await TaskModel.find();
  const queueTasks = tasks.map(t => ({
    body: {
      URL: t.URL,
      tagPath: t.tagPath,
    },
    interval: t.dataListeners[0].freq,
  }));

  const scheduler = new TaskScheduler(queueTasks, {
    host, queueName: PARSER_QUEUE_NAME,
  }, (data) => {
    console.log('Parser', data);
  });
  global.taskScheduler = scheduler;
  return (scheduler);
};
