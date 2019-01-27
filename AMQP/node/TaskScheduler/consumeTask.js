import amqp from 'amqplib/callback_api';
import manager from './manager';

export default ({
  queueName, deletions, host, channel, removeFromDeletions,
}, callback) => {
  if (channel) {
    channel.consume(queueName, (msg) => {
      manager(host, msg.content, deletions, removeFromDeletions, callback, channel);
    }, { noAck: true });
  } else {
    amqp.connect(host,
      (connectionErr, conn) => {
        if (connectionErr) console.log(connectionErr);
        conn.createChannel((channelErr, ch) => {
          ch.assertQueue(queueName, { durable: true });
          ch.consume(queueName, (msg) => {
            manager(host, msg.content, deletions, removeFromDeletions, callback, channel);
          }, { noAck: true });
        });
      });
  }
};
