import amqp from 'amqplib/callback_api';

export default ({
  queueName, data, host, channel,
}) => {
  if (channel) {
    channel.sendToQueue(queueName, Buffer.from(data), { persistent: true });
  } else {
    amqp.connect(host,
      (connectionErr, conn) => {
        conn.createChannel((channelErr, ch) => {
          ch.assertQueue(queueName, { durable: true });
          ch.sendToQueue(queueName, Buffer.from(data), { persistent: true });
        });
      });
  }
};
