/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */

import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { PubSub, UserInputError } from 'apollo-server-express';
import { secret } from '../../config/config.json';
import '../../models/User';

const UserModel = mongoose.model('User');
const pubSub = new PubSub();

function paginate(cursor, limit) {
  if(!cursor && !limit) return {};
  if(!cursor) cursor = 1;
  if(!limit) limit = 5;

  return {
    skip: limit * (cursor - 1),
    limit,
  };
}

export default {
  Query: {
    users(parent, { cursor, limit }) {
      return UserModel.find({}, {
        role: 1, createdAt: 1, email: 1, dates: 1,
      }, paginate(cursor, limit)).populate('projects').populate({
        path: 'cart',
        populate: { path: 'project' },
      }).exec();
    },
    user(parent, { id }) {
      return UserModel.findById(id, {
        role: 1, createdAt: 1, email: 1, projects: 1, cart: 1,
      }).populate('projects').populate({
        path: 'cart',
        populate: { path: 'project' },
      }).exec();
    },
    me(parent, { id }) {
      return UserModel.findById(id, {
        role: 1, createdAt: 1, email: 1, dates: 1,
      }).populate('dates').exec();
    },
  },
  Mutation: {
    async signUp(parent, { email, password }, context) {
      const user = new UserModel({
        email,
        password,
        role: 'user',
        cart: [],
        projects: [],
        orders: [],
        createdAt: new Date(),
      });
      const newUser = await user.save();
      pubSub.publish('USER_ADDED', { userAdded: newUser });
      return newUser;
    },
    async signIn(parent, { email, password }, context) {
      const user = await UserModel.findOne({ email });
      if (!user) {
        throw new UserInputError('Incorrect email');
      } else if (!user.validPassword(password)) {
        throw new UserInputError('Incorrect password');
      } else {
        const role = user.role;
        const _id = user._id.toString();
        const refreshToken = jwt.sign({ _id, role }, secret, { expiresIn: 420000 });
        const loggedUser = await UserModel.findOneAndUpdate({ _id },
          { refreshToken }, { new: true });
        return {
          accessToken: jwt.sign({ _id: loggedUser._id.toString(), role },
            secret, { expiresIn: 900 }),
          refreshToken,
          user,
        };
      }
    },
    async refreshToken(parent, { refreshToken }, context) {
      const { _id, role } = jwt.verify(refreshToken, secret);
      return { accessToken: jwt.sign({ _id, role }, secret, { expiresIn: 900 }) };
    },
    async logOut(parent, { accessToken, refreshToken }, context) {
      return true; // Add to blacklist
    },
    async updateUser(parent, { id, role, previousPassword, newPassword }) {
      let updatedUser = {};
      if (previousPassword && newPassword) {
        const user = await UserModel.findOne({ _id: id });
        if (!user) {
          throw new UserInputError('Incorrect user ID');
        } else if (!user.validPassword(previousPassword)) {
          throw new UserInputError('Incorrect password');
        } else {
          updatedUser = await UserModel.findOneAndUpdate({_id: id}, {password: newPassword}, {new: true});
        }
      } else {
        await UserModel.findById(id).update({role});
        updatedUser = await UserModel.findById(id).populate('projects').populate({
          path: 'cart',
          populate: { path: 'project' },
        });
      }
      pubSub.publish('USER_UPDATED', { userUpdated: updatedUser });
      return updatedUser;
    },
    async deleteUser(parent, { id }) {
      const deletedUser = await UserModel.findById(id).remove();
      pubSub.publish('USER_DELETED', { userDeleted: deletedUser });
      return deletedUser;
    },
  },
  Subscription: {
    userAdded: {
      subscribe: () => pubSub.asyncIterator(['USER_ADDED']),
    },
    userUpdated: {
      subscribe: () => pubSub.asyncIterator(['USER_UPDATED']),
    },
    userDeleted: {
      subscribe: () => pubSub.asyncIterator(['USER_DELETED']),
    },
  },
};
