import { FailureModel } from '../../../models/Failure';
import { MessageModel } from '../../../models/Message';
import { UserModel } from '../../../models/User';

interface Total {
  count: number;
}

export default {
  Query: {

    /**
     *  Returns count documents of target
     */

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