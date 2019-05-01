import mongoose from 'mongoose';
import '../models/Permission';
import '../models/User';
import config from './config';
import messages from '../NLP/libs/NLP/classification/corpuses/faults_classification_corpus';
import AMQPChannel from '../libs/AMQPChannel';

const { email, password } = config.admin;
const adminRole = config.admin.role;
const { defaultCity, defaultCountry } = config.geolocation;
const {
  messageBroker: {
    HOST,
    NLP_QUEUE_NAME,
  },
} = config;

const PermissionModel = mongoose.model('Permission');
const UserModel = mongoose.model('User');

const roles = [
  {
    role: 'guest',
    actions: ['signIn', 'signUp', 'refreshToken', 'messages', 'failures', 'services', '__schema'],
  },
  {
    role: 'user',
    actions:
      [
        'signIn', 'signUp', 'refreshToken', 'messages', 'failures', 'user', 'services', '__schema',
        'logOut', 'addFailure', 'removeFailure', 'addMessage', 'removeMessage',
      ],
  },
  {
    role: 'admin',
    actions:
      [
        'signIn', 'signUp', 'refreshToken', 'messages', 'failures', 'user', 'services', '__schema',
        'logOut', 'addFailure', 'removeFailure', 'addMessage', 'removeMessage',
        'tags', 'addTarget', 'removeTarget', 'updateTarget', 'users',
      ],
  },
  {
    role: 'superAdmin',
    actions:
      [
        'signIn', 'signUp', 'refreshToken', 'messages', 'failures', 'user', 'services', '__schema',
        'logOut', 'addFailure', 'removeFailure', 'addMessage', 'removeMessage',
        'tags', 'addTarget', 'removeTarget', 'updateTarget', 'users',
        'roles', 'actions', 'addRole', 'addAction', 'deleteRole', 'deleteAction', 'updateUser', 'deleteUser',
      ],
  },
];

export default async () => {
  await PermissionModel.remove()
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

  // Initialise nlpChannel message broker
  const nlpChannel = await new AMQPChannel({
    queueName: NLP_QUEUE_NAME,
    host: HOST,
  });

  messages.forEach(m => nlpChannel.sendToQueue({
    text: m.text,
    payload: {
      city: defaultCity,
      country: defaultCountry,
      service: m.categories[1],
    },
  }));
};
