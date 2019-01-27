import newTask from './newTask';
import { PARSER_QUEUE_NAME } from './config';

export default async (host, task, deletions, removeFromDeletions, callback, channel) => {
  const content = JSON.parse(task);
  if (deletions.includes(content.body)) {
    removeFromDeletions(content.body);
  } else if (content.expired > Date.now()) {
    newTask({
      channel,
      queueName: PARSER_QUEUE_NAME,
      data: task,
      host,
    });
  } else {
    newTask({
      channel,
      queueName: PARSER_QUEUE_NAME,
      data: JSON.stringify({
        body: content.body,
        expired: Date.now() + content.interval,
        interval: content.interval,
        host,
      }),
    });
    callback(content.body);
  }
};
