import mongoose from 'mongoose';
import '../models/Task';
import TaskScheduler from '../libs/TaskScheduler';
import Scraper from '../libs/Scraper';
import AMQPChannel from '../libs/AMQPChannel';
import actionFromNLP from '../helpers/actionFromNLP';
import alreadyScraped from '../helpers/isAlreadyScraped';
import ActionDispatcher from '../controllers/ActionDispatcher';
import config from './config';

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
      URL: t.URL + '/index.php?start=3',
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

  nlpOutputChannel.consume((data) => {
    // Get action with payload from NLP results
    const action = actionFromNLP(data);
    ActionDispatcher.dispatch(action);
  });

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
    parsedTextArray.forEach(async (text) => {
      nlpChannel.sendToQueue(text); // Delete this string!!!
      if (!await alreadyScraped(text)) nlpChannel.sendToQueue(text);
    });
  });
  global.taskScheduler = scheduler; // making taskScheduler exemplar accessible for DB hooks
  return (scheduler);
};