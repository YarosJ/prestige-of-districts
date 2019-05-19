import debug from 'debug';
import { UserModel } from '../../models/User';
import * as config from '../config.json';

const debugAdmin = debug('seedDB');

const { email, password, role } = config.admin;

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
