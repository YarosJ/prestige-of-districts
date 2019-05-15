import mongoose from 'mongoose';
import '../../../models/Failure.ts';
import '../../../models/Message.ts';
import '../../../models/User.ts';

const FailureModel = mongoose.model('Failure');
const MessageModel = mongoose.model('Message');
const UserModel = mongoose.model('User');

export default {
  Query: {
    async total(parent, { target }) {
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
