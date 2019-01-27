import mongoose from 'mongoose';
import '../models/Task';
import TaskScheduler from '../AMQP/node/TaskScheduler';
// import { PARSER_QUEUE_NAME } from '../config/config';

const TaskModel = mongoose.model('Task');
const host = 'amqp://localhost';

export default async () => {
  const tasks = await TaskModel.find();
  const scheduler = new TaskScheduler(tasks, host, (data) => {
    console.log('Parser', data);
  });
  global.taskScheduler = scheduler;
  return (scheduler);
};
