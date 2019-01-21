import mongoose from 'mongoose';
import '../models/Task';
import newTask from '../AMQP/node/newTask';
import consumeTask from '../AMQP/node/consumeTask';
import { messageBroker } from '../config/config';

const { PARSER_QUEUE_NAME } = messageBroker;
const TaskModel = mongoose.model('Task');

export default async () => {
  const tasks = await TaskModel.find();
  tasks.forEach((t) => {
    const interval = t.dataListeners[0].freq; // must be min freq of provided
    newTask({
      queueName: PARSER_QUEUE_NAME,
      data: JSON.stringify({
        body: t.URL,
        expired: Date.now() + interval,
        interval,
      }),
    });
  });
  consumeTask({ queueName: PARSER_QUEUE_NAME }, (data) => {
    console.log('Parser');
  });
};
