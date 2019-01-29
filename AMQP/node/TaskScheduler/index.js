/* eslint-disable no-underscore-dangle */
import amqp from 'amqplib/callback_api';
import { QUEUE_NAME, HOST } from './config';

/**
 * TaskScheduler class.
 */
export default class TaskScheduler {
  /**
   * Creates an instance of TaskScheduler class.
   * @param {array} tasks - Array from tasks:
   * [
   *   task: {
   *     body: JSON,
   *     expired: NULL,
   *     interval: INTEGER, // ms
   *   }
   * ]
   * @param {object} config - Configuration
   * @param {function} callback - Callback
   */
  constructor(tasks, config, callback) {
    this.queueName = config.queueName || QUEUE_NAME;
    this.host = config.host || HOST;
    this.deletions = [];
    amqp.connect(this.host,
      async (connectionErr, conn) => {
        if (connectionErr) throw connectionErr;
        const ch = await conn.createChannel();
        ch.assertQueue(this.queueName, { durable: true });
        this.channel = ch;
        this.addTasks(tasks);
        this._taskManager(callback);
      });
  }

  /**
   * Pushes new tasks into the queue.
   * @param {array} tasks - Tasks to add
   */
  addTasks(tasks) {
    tasks.forEach((t) => {
      if (!t.body || !t.interval) throw new Error('Invalid task body or interval');
      this._newTask({
        body: t.body,
        expired: Date.now() + t.interval,
        interval: t.interval,
      });
    });
  }

  /**
   * Pushes tasks into the deletion list
   * @param {array} tasks - Tasks to delete
   */
  deleteTasks(tasks) {
    const stringTasks = tasks.map(t => JSON.stringify(t));
    this.deletions.push(...stringTasks);
  }

  /**
   * Managing tasks in queue
   * @param callback
   * @private
   */
  _taskManager(callback) {
    this.channel.consume(this.queueName, (msg) => {
      const bufferTask = msg.content;
      const JSONTask = JSON.parse(bufferTask);
      const { body } = JSONTask;
      if (this.deletions.includes(JSON.stringify(body))) {
        this._removeFromDeletions(body);
      } else if (JSONTask.expired > Date.now()) {
        this._newTask(bufferTask);
      } else {
        this._newTask({
          body,
          expired: Date.now() + JSONTask.interval,
          interval: JSONTask.interval,
        });
        callback(body);
      }
    }, { noAck: true });
  }

  /**
   * Delete item from deletions list
   * @param item
   * @private
   */
  _removeFromDeletions(item) {
    this.deletions = this.deletions.filter(d => d !== JSON.stringify(item));
  }

  /**
   * Send new task into the queue
   * @param data
   * @private
   */
  _newTask(data) {
    const bufferData = data instanceof Buffer ? data : Buffer.from(JSON.stringify(data));
    this.channel.sendToQueue(this.queueName, bufferData, { persistent: true });
  }
}
