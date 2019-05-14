import amqp from 'amqplib';
import { QUEUE_NAME, HOST } from './config';

/**
 * Establishes AMQP connection and make able to send
 * and receive messages from queue with methods sendToQueue() and consume()
 */

export default class AMQPChannel {
  public queueName: string;

  public host: string;

  public constructor(config) {
    this.queueName = config.queueName || QUEUE_NAME;
    this.host = config.host || HOST;

    return (async (): Promise <AMQPChannel> => {
      const conn = await amqp.connect(this.host);
      const ch = await conn.createChannel();

      ch.assertQueue(this.queueName, { durable: true, autoDelete: true });
      this.channel = ch;

      return this;
    })();
  }

  public consume(callback): AMQPChannel {
    this.channel.consume(this.queueName, (msg): void => {
      callback(msg.content.toString());
    }, { noAck: true });

    return this;
  }

  public sendToQueue(data): AMQPChannel {
    const bufferData = data instanceof Buffer ? data : Buffer.from(JSON.stringify(data));

    this.channel.sendToQueue(this.queueName, bufferData, { persistent: true });

    return this;
  }
}
