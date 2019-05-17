import * as mongoose from 'mongoose';
import debug from 'debug';
import * as config from '../config.json';
import '../../models/User';

const debugAdmin = debug('seedDB');

const { email, password, role } = config.admin;

const UserModel = mongoose.model('User');

export default async (permanent): Promise <void> => {
  if (permanent) await UserModel.remove();
  if (await UserModel.count() === 0) {
    const user = new UserModel({
      email,
      password,
      role,
      createdAt: new Date(),
    });
    await user.save();
  }
  debugAdmin('Seed admin ✅');
};
