import debug from 'debug';
import messages from '../../NLP/libs/NLP/classification/corpuses/faults_classification_corpus';
import AMQPChannel from '../../libs/AMQPChannel/index.ts';
import config from '../config';

const debugFailures = debug('seedDB');

const { defaultCity, defaultCountry } = config.geolocation;
const {
  messageBroker: {
    HOST,
    NLP_QUEUE_NAME,
  },
} = config;

export default async (): Promise <void> => {
  // Initialise nlpChannel message broker
  const nlpChannel: object = await new AMQPChannel({
    queueName: NLP_QUEUE_NAME,
    host: HOST,
  });

  debugFailures('🚧 Start seeding failures');

  const shuffledMessages = messages.sort((): number => Math.random() - 0.5);

  shuffledMessages.forEach((m): void => nlpChannel.sendToQueue({
    text: m.text,
    payload: {
      city: defaultCity,
      country: defaultCountry,
      service: m.categories[1],
      date: m.date,
    },
  }));
};
