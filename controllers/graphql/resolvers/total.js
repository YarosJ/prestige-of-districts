import mongoose from 'mongoose';
import '../../models/Project';
import '../../models/Order';
import '../../models/User';

mongoose.set('debug', true);
const ProjectModel = mongoose.model('Project');
const OrderModel = mongoose.model('Order');
const UserModel = mongoose.model('User');

export default {
  Query: {
    async total(parent, { target }) {
      switch (target) {
        case 'Projects':
          return { count: await ProjectModel.count() };
        case 'Orders':
          return { count: await OrderModel.count() };
        case 'Users':
          return { count: await UserModel.count() };
        default:
          return { count: 0 };
      }
    },
  }
};
