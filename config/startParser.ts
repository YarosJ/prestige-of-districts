// eslint-disable-next-line
/// <reference path="../index.d.ts" />

import { TargetModel } from '../models/Target';
import TaskScheduler from '../libs/TaskScheduler';
import Scraper from '../libs/Scraper';
import AMQPChannel from '../libs/AMQPChannel';
import actionFromNLP from '../helpers/actionFromNLP';
import alreadyScraped from '../helpers/isAlreadyScraped';
import ActionDispatcher from '../controllers/ActionDispatcher';
import * as config from './config.json';

// Get configs for message broker and scheduler
const {
  messageBroker: {
    HOST,
    NLP_QUEUE_NAME,
    NLP_OUTPUT_QUEUE_NAME,
  },
} = config;

interface Task {
  body: {
    URL: string;
    tagPaths: string[];
    city: string;
    country: string;
    service: string;
  };
  interval: number;
}

/**
 * Starts parser
 */

const startParser = async (): Promise <TaskScheduler> => {
  const tasks = await TargetModel.find(); // Get all tasks from DB

  // Adapting tasks from DB for TaskScheduler
  const queueTasks: Task[] = tasks.map((t): Task => ({
    body: {
      URL: t.URL,
      tagPaths: t.tagPaths,
      city: t.city,
      country: t.country,
      service: t.service,
    },
    interval: t.freq,
  }));

  const scraper = await new Scraper(); // Initialise scraper
  await scraper.openBrowser();

  // Initialise nlpChannel message broker
  const nlpChannel = await new AMQPChannel({
    queueName: NLP_QUEUE_NAME,
    host: HOST,
  });

  await nlpChannel.connect();

  // Initialise nlpOutputChannel message broker
  const nlpOutputChannel = await new AMQPChannel({
    queueName: NLP_OUTPUT_QUEUE_NAME,
    host: HOST,
  });

  await nlpOutputChannel.connect();

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

export default startParser;
