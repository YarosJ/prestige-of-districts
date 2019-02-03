/* eslint-disable no-underscore-dangle */
import amqp from 'amqplib/callback_api';
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
    amqp.connect(this.host,
      async (connectionErr, conn) => {
        if (connectionErr) throw connectionErr;
        const ch = await conn.createChannel();
        ch.assertQueue(this.queueName, { durable: true });
        this.channel = ch;
      });
  }

  /**
   * Consume messages form queue.
   * @param callback
   * @private
   */
  consume(callback) {
    this.channel.consume(this.queueName, (msg) => {
      callback(JSON.parse(msg.content));
    }, { noAck: true });
  }

  /**
   * Send new message into the queue.
   * @param data
   * @private
   */
  sendToQueue(data) {
    const bufferData = data instanceof Buffer ? data : Buffer.from(JSON.stringify(data));
    this.channel.sendToQueue(this.queueName, bufferData, { persistent: true });
  }
}
