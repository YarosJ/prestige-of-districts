/* eslint-disable no-underscore-dangle */
import amqp from 'amqplib';
import { QUEUE_NAME, HOST } from './config';

/**
 * AMQPChannel class.
 */
export default class AMQPChannel {
  /**
   * Creates an instance of TaskScheduler class.
   * @param {object} config - Configuration
   */
  constructor(config) {
    this.queueName = config.queueName || QUEUE_NAME;
    this.host = config.host || HOST;
    return (async () => {
      const conn = await amqp.connect(this.host);
      const ch = await conn.createChannel();
      ch.assertQueue(this.queueName, { durable: true });
      this.channel = ch;
      return (this);
    })();
  }

  /**
   * Consume messages form queue.
   * @param callback
   */
  consume(callback) {
    this.channel.consume(this.queueName, (msg) => {
      callback(msg.content.toString());
    }, { noAck: true });
  }

  /**
   * Send new message into the queue.
   * @param data
   */
  sendToQueue(data) {
    const bufferData = data instanceof Buffer ? data : Buffer.from(JSON.stringify(data));
    this.channel.sendToQueue(this.queueName, bufferData, { persistent: true });
  }
}
