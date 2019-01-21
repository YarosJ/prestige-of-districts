import amqp from 'amqplib/callback_api';

export default ({ queueName, data }) => amqp.connect('amqp://localhost',
  (connectionErr, conn) => {
    conn.createChannel((channelErr, ch) => {
      ch.assertQueue(queueName, { durable: true });
      ch.sendToQueue(queueName, Buffer.from(data), { persistent: true });
    });
  });
