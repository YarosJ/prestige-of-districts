import * as mongoose from 'mongoose';
import '../../../models/Failure';
import '../../../models/Message';
import '../../../models/User';

const FailureModel = mongoose.model('Failure');
const MessageModel = mongoose.model('Message');
const UserModel = mongoose.model('User');

interface Total {
  count: number;
}

export default {
  Query: {
    async total(parent, { target }): Promise <Total> {
      switch (target) {
        case 'Failures':
          return { count: await FailureModel.count() };
        case 'Messages':
          return { count: await MessageModel.count() };
        case 'Users':
          return { count: await UserModel.count() };
        default:
          return { count: 0 };
      }
    },
  },
};
