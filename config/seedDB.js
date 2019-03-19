import mongoose from 'mongoose';
import '../models/Permission';
import '../models/User';

const PermissionModel = mongoose.model('Permission');
const UserModel = mongoose.model('User');

const roles = [
  {
    role: 'guest',
    actions: ['signIn', 'signUp', 'refreshToken', 'messages', 'failures', 'user'],
  },
  {
    role: 'user',
    actions:
      [
        'signIn', 'signUp', 'refreshToken', 'messages', 'failures', 'user',
        'me', 'logOut', 'addFailure', 'removeFailure', 'addMessage', 'removeMessage',
      ],
  },
  {
    role: 'admin',
    actions:
      [
        'signIn', 'signUp', 'refreshToken', 'messages', 'failures', 'user',
        'me', 'logOut', 'addFailure', 'removeFailure', 'addMessage', 'removeMessage',
        'tags', 'addTarget', 'removeTarget', 'updateTarget', 'users',
      ],
  },
  {
    role: 'superAdmin',
    actions:
      [
        'signIn', 'signUp', 'refreshToken', 'messages', 'failures', 'user',
        'me', 'logOut', 'addFailure', 'removeFailure', 'addMessage', 'removeMessage',
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
      email: 'jaroslawjuk@outlook.com',
      password: '19981798',
      role: 'superAdmin',
      cart: [],
      projects: [],
      orders: [],
      createdAt: new Date(),
    });
    await user.save();
  }
};
