import amqp from 'amqplib/callback_api';
import newTask from './newTask';
import consumeTask from './consumeTask';
import { PARSER_QUEUE_NAME } from './config';

export default class TaskScheduler {
  constructor(tasks, host, callback) {
    amqp.connect(host,
      (connectionErr, conn) => {
        conn.createChannel((channelErr, ch) => {
          ch.assertQueue(PARSER_QUEUE_NAME, { durable: true });
          this.taskChannel = ch;
          tasks.forEach((t) => {
            const interval = t.dataListeners[0].freq; // must be min freq of provided
            newTask({
              channel: this.taskChannel,
              queueName: PARSER_QUEUE_NAME,
              data: JSON.stringify({
                body: t.URL,
                expired: Date.now() + interval,
                interval,
                host,
              }),
            });
          });
          consumeTask({
            queueName: PARSER_QUEUE_NAME,
            deletions: this.deletions,
            channel: this.taskChannel,
            removeFromDeletions: this.removeFromDeletions.bind(this),
            host,
          }, callback);
        });
      });
    this.host = host;
    this.deletions = [];
  }

  removeFromDeletions(item) {
    this.deletions = this.deletions.filter(d => d !== item);
  }

  addTasks(tasks) {
    tasks.forEach((t) => {
      const interval = t.dataListeners[0].freq; // must be min freq of provided
      newTask({
        channel: this.taskChannel,
        queueName: PARSER_QUEUE_NAME,
        data: JSON.stringify({
          body: t.URL,
          expired: Date.now() + interval,
          interval,
          host: this.host,
        }),
      });
    });
  }

  deleteTasks(tasks) {
    this.deletions.push(...tasks);
  }
}
