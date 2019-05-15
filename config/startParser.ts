import mongoose from 'mongoose';
import '../models/Task.ts';
import TaskScheduler from '../libs/TaskScheduler/index.ts';
import Scraper from '../libs/Scraper/index.ts';
import AMQPChannel from '../libs/AMQPChannel/index.ts';
import actionFromNLP from '../helpers/actionFromNLP.ts';
import alreadyScraped from '../helpers/isAlreadyScraped.ts';
import ActionDispatcher from '../controllers/ActionDispatcher.ts';
import config from './config';

// Get configs for message broker and scheduler
const {
  messageBroker: {
    HOST,
    NLP_QUEUE_NAME,
    NLP_OUTPUT_QUEUE_NAME,
  },
} = config;

const TaskModel = mongoose.model('Task');

/**
 * Starts parser
 */
export default async (): Promise <TaskScheduler> => {
  const tasks: object[] = await TaskModel.find(); // Get all tasks from DB

  // Adapting tasks from DB for TaskScheduler
  const queueTasks: object[] = tasks.map((t): object => ({
    body: {
      URL: t.URL,
      tagPaths: t.tagPaths,
      city: t.city,
      country: t.country,
      service: t.service,
    },
    interval: t.freq,
  }));

  const scraper: object = await new Scraper(); // Initialise scraper

  // Initialise nlpChannel message broker
  const nlpChannel: object = await new AMQPChannel({
    queueName: NLP_QUEUE_NAME,
    host: HOST,
  });

  // Initialise nlpOutputChannel message broker
  const nlpOutputChannel: object = await new AMQPChannel({
    queueName: NLP_OUTPUT_QUEUE_NAME,
    host: HOST,
  });

  nlpOutputChannel.consume((data): void => {
    // Get action with payload from NLP results and dispatch
    ActionDispatcher.dispatch(actionFromNLP(data));
  });

  // Starting TaskScheduler with scraper
  const scheduler = new TaskScheduler(queueTasks,
    { precision: 5 },
    async (data): Promise <void> => {
      // Parse text by URL and tags paths
      const parsedTextArray: string[] = await scraper.getText(data.URL, data.tagPaths);

      // Send parsed text to NLP
      parsedTextArray.forEach(async (text): Promise <void> => {
        if (!await alreadyScraped(text)) {
          nlpChannel.sendToQueue({
            text,
            payload: {
              city: data.city,
              country: data.country,
              service: data.service,
            },
          });
        }
      });
    });

  global.taskScheduler = scheduler; // making taskScheduler exemplar accessible for DB hooks

  return scheduler;
};
