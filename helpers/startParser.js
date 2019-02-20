import mongoose from 'mongoose';
import '../models/Task';
import TaskScheduler from '../libs/TaskScheduler';
import Scraper from '../libs/Scraper';
import AMQPChannel from '../libs/AMQPChannel';
import processNLP from './processNLP';
import config from '../config/config';

// Get configs for message broker and scheduler
const {
  messageBroker: {
    HOST,
    SCHEDULER_QUEUE_NAME,
    NLP_QUEUE_NAME,
    NLP_OUTPUT_QUEUE_NAME,
  },
} = config;

const TaskModel = mongoose.model('Task');

/**
 * Starts parser
 * @returns {Promise<TaskScheduler>}
 */
export default async () => {
  const tasks = await TaskModel.find(); // Get all tasks from DB
  // Adapting tasks from DB for TaskScheduler
  const queueTasks = tasks.map(t => ({
    body: {
      URL: t.URL,
      tagPaths: t.tagPaths,
    },
    interval: t.freq,
  }));

  const scraper = await new Scraper(); // Initialise scraper

  // Initialise nlpChannel message broker
  const nlpChannel = await new AMQPChannel({
    queueName: NLP_QUEUE_NAME,
    host: HOST,
  });

  // Initialise nlpOutputChannel message broker
  const nlpOutputChannel = await new AMQPChannel({
    queueName: NLP_OUTPUT_QUEUE_NAME,
    host: HOST,
  });

  nlpOutputChannel.consume(data => processNLP(data)); // Process NLP results

  /**
   * Starting TaskScheduler with scraper
   * @type {TaskScheduler}
   */
  const scheduler = new TaskScheduler(queueTasks, {
    host: HOST, queueName: SCHEDULER_QUEUE_NAME,
  }, async (data) => {
    // Parse text by URL and tags paths
    const parsedTextArray = await scraper.getText(data.URL, data.tagPaths);
    // Send array of parsed text to NLP
    parsedTextArray.forEach(text => nlpChannel.sendToQueue(text));
  });
  global.taskScheduler = scheduler; // making taskScheduler exemplar accessible for DB hooks
  return (scheduler);
};
