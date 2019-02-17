import mongoose from 'mongoose';
import '../models/Task';
import TaskScheduler from '../libs/TaskScheduler';
import Scraper from '../libs/Scraper';
import AMQPChannel from '../libs/AMQPChannel';
import { messageBroker } from '../config/config';

const {
  HOST,
  SCHEDULER_QUEUE_NAME,
  NLP_QUEUE_NAME,
  NLP_OUTPUT_QUEUE_NAME,
} = messageBroker;

const TaskModel = mongoose.model('Task');

export default async () => {
  const tasks = await TaskModel.find();
  const queueTasks = tasks.map(t => ({
    body: {
      URL: t.URL,
      tagPaths: t.tagPaths,
    },
    interval: t.freq,
  }));

  const scraper = await new Scraper();
  const nlpChannel = await new AMQPChannel({ queueName: NLP_QUEUE_NAME, host: HOST });
  const nlpOutputChannel = await new AMQPChannel({ queueName: NLP_OUTPUT_QUEUE_NAME, host: HOST });
  nlpOutputChannel.consume(data => console.log(JSON.parse(data))); // Sanitize and geocode

  const scheduler = new TaskScheduler(queueTasks, {
    host: HOST, queueName: SCHEDULER_QUEUE_NAME,
  }, async (data) => {
    const parsedTextArray = await scraper.getText(data.URL, data.tagPaths);
    parsedTextArray.forEach(text => nlpChannel.sendToQueue(text));
  });
  global.taskScheduler = scheduler;
  return (scheduler);
};
