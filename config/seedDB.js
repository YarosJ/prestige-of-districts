import mongoose from 'mongoose';
import '../models/Permission';
import '../models/User';
import config from './config';

const { email, password } = config.admin;
const adminRole = config.admin.role;
const PermissionModel = mongoose.model('Permission');
const UserModel = mongoose.model('User');

const roles = [
  {
    role: 'guest',
    actions: ['signIn', 'signUp', 'refreshToken', 'messages', 'failures'],
  },
  {
    role: 'user',
    actions:
      [
        'signIn', 'signUp', 'refreshToken', 'messages', 'failures', 'user',
        'logOut', 'addFailure', 'removeFailure', 'addMessage', 'removeMessage',
      ],
  },
  {
    role: 'admin',
    actions:
      [
        'signIn', 'signUp', 'refreshToken', 'messages', 'failures', 'user',
        'logOut', 'addFailure', 'removeFailure', 'addMessage', 'removeMessage',
        'tags', 'addTarget', 'removeTarget', 'updateTarget', 'users',
      ],
  },
  {
    role: 'superAdmin',
    actions:
      [
        'signIn', 'signUp', 'refreshToken', 'messages', 'failures', 'user',
        'logOut', 'addFailure', 'removeFailure', 'addMessage', 'removeMessage',
        'tags', 'addTarget', 'removeTarget', 'updateTarget', 'users',
        'roles', 'actions', 'addRole', 'addAction', 'deleteRole', 'deleteAction', 'updateUser', 'deleteUser',
      ],
  },
];

export default async () => {
  if (await PermissionModel.count() === 0) {
    roles.map(async (r) => {
      const { role, actions } = r;
      const roleDoc = new PermissionModel({ role, actions });
      await roleDoc.save();
    });
  }

  if (await UserModel.count() === 0) {
    const user = new UserModel({
      email,
      password,
      role: adminRole,
      createdAt: new Date(),
    });
    await user.save();
  }
};
