import mongoose from 'mongoose';
import debug from 'debug';
import '../../models/Permission';

const debugAccessControl = debug('seedDB');

const roles = [
  {
    role: 'guest',
    actions: ['signIn', 'signUp', 'refreshToken', 'messages', 'failures', 'services', '__schema', 'total'],
  },
  {
    role: 'user',
    actions:
      [
        'signIn', 'signUp', 'refreshToken', 'messages', 'failures', 'user', 'services', '__schema', 'total',
        'logOut', 'addFailure', 'removeFailure', 'addMessage', 'removeMessage',
      ],
  },
  {
    role: 'admin',
    actions:
      [
        'signIn', 'signUp', 'refreshToken', 'messages', 'failures', 'user', 'services', '__schema', 'total',
        'logOut', 'addFailure', 'removeFailure', 'addMessage', 'removeMessage',
        'tags', 'targets', 'addTarget', 'removeTarget', 'updateTarget', 'users',
        'screenshot', 'selector',
      ],
  },
  {
    role: 'superAdmin',
    actions:
      [
        'signIn', 'signUp', 'refreshToken', 'messages', 'failures', 'user', 'services', '__schema', 'total',
        'logOut', 'addFailure', 'removeFailure', 'addMessage', 'removeMessage',
        'tags', 'targets', 'addTarget', 'removeTarget', 'updateTarget', 'users',
        'roles', 'actions', 'addRole', 'addAction', 'deleteRole', 'deleteAction', 'updateUser', 'deleteUser',
        'screenshot', 'selector',
      ],
  },
];

const PermissionModel = mongoose.model('Permission');

export default async (permanent) => {
  if (permanent) await PermissionModel.remove();
  if (await PermissionModel.count() === 0) {
    await Promise.all(roles.map(async (r) => {
      const { role, actions } = r;
      const roleDoc = new PermissionModel({ role, actions });
      await roleDoc.save();
    }));
  }
  debugAccessControl('Seed access control ✅');
};
