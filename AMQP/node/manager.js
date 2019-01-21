import mongoose from 'mongoose';
import newTask from './newTask';
import { messageBroker } from '../../config/config';
import '../../models/Change';

const ChangeModel = mongoose.model('Change');
const { PARSER_QUEUE_NAME } = messageBroker;

export default async (task, callback) => {
  const content = JSON.parse(task);
  const changes = await ChangeModel.findOne();
  // check manager updates
  if (!changes) {
    if (content.expired > Date.now()) {
      newTask({
        queueName: PARSER_QUEUE_NAME,
        data: task,
      });
    } else {
      const t = JSON.parse(task.toString());
      newTask({
        queueName: PARSER_QUEUE_NAME,
        data: JSON.stringify({
          body: t.URL,
          expired: Date.now() + t.interval,
          interval: t.interval,
        }),
      });
      callback(content.body);
    }
  } else {
    // const managerEmpty = changes.addTask.length === 0
    //   || changes.removeTask.length === 0
    //   || changes.updateTask.length === 0;
    //
    // if (content.expired > Date.now() && managerEmpty) {
    //   newTask({
    //     queueName: PARSER_QUEUE_NAME,
    //     data: task,
    //   });
    //   callback(content.body);
    // } else if (changes.addTask) {
    //   // spawn new
    // } else if (changes.removeTask) {
    //   // if === current return null
    // }
  }
};
