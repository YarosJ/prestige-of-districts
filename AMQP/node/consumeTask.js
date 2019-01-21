import amqp from 'amqplib/callback_api';
import manager from './manager';

export default ({ queueName }, callback) => amqp.connect('amqp://localhost',
  (connectionErr, conn) => {
    console.log(connectionErr);
    conn.createChannel((channelErr, ch) => {
      ch.assertQueue(queueName, { durable: true });
      // ch.prefetch(1);
      ch.consume(queueName, (msg) => {
        manager(msg.content, callback);
      }, { noAck: true });
    });
  });
