/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { UserInputError } from 'apollo-server-express';
import { secret } from '../../../config/config.json';
import paginate from '../../../helpers/graphQL/paginate';
import '../../../models/User';

const UserModel = mongoose.model('User');

export default {
  Query: {
    /**
     * Finds users and paginate by cursor and limit
     * @param parent
     * @param cursor
     * @param limit
     * @returns {*}
     */
    users(parent, { cursor, limit }) {
      return UserModel.find({}, {
        role: 1, createdAt: 1, email: 1, dates: 1,
      }, paginate(cursor, limit));
    },

    /**
     * Finds user by given id
     * @param parent
     * @param id
     * @returns {Promise}
     */
    user(parent, { id }) {
      return UserModel.findById(id, {
        role: 1, createdAt: 1, email: 1, targets: 1,
      });
    },
  },

  Mutation: {
    /**
     * Creates new user in DB
     * @param parent
     * @param email
     * @param password
     * @returns {Promise<*>}
     */
    async signUp(parent, { email, password }) {
      const user = new UserModel({
        email,
        password,
        role: 'user',
        targets: [],
        createdAt: new Date(),
      });
      return user.save();
    },

    /**
     * Checks given email and password and
     * returns new access and refresh token
     * @param parent
     * @param email
     * @param password
     * @returns {Promise<{accessToken: *, refreshToken: *, user}>}
     */
    async signIn(parent, { email, password }) {
      const user = await UserModel.findOne({ email });
      if (!user) {
        throw new UserInputError('Incorrect email');
      } else if (!user.validPassword(password)) {
        throw new UserInputError('Incorrect password');
      } else {
        const { role } = user;
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

    /**
     * Returns new access token by refresh token
     * @param parent
     * @param refreshToken
     * @returns {Promise<{accessToken: *}>}
     */
    async refreshToken(parent, { refreshToken }) {
      const { _id, role } = jwt.verify(refreshToken, secret);
      return { accessToken: jwt.sign({ _id, role }, secret, { expiresIn: 900 }) };
    },

    /**
     * Adds access and refresh token to blacklist
     * @param parent
     * @param accessToken
     * @param refreshToken
     * @returns {Promise<boolean>}
     */
    async logOut(parent, { accessToken, refreshToken }) {
      console.log({ accessToken, refreshToken });
      return true; // Add to blacklist
    },

    /**
     * Finds user by given id and
     * update him by given params
     * @param parent
     * @param id
     * @param role
     * @param previousPassword
     * @param newPassword
     * @returns {Promise<void>}
     */
    async updateUser(parent, {
      id, role, previousPassword, newPassword,
    }) {
      let updatedUser = {};
      if (previousPassword && newPassword) {
        const user = await UserModel.findOne({ _id: id });
        if (!user) {
          throw new UserInputError('Incorrect user ID');
        } else if (!user.validPassword(previousPassword)) {
          throw new UserInputError('Incorrect password');
        } else {
          updatedUser = await UserModel.findOneAndUpdate(
            { _id: id },
            { password: newPassword },
            { new: true },
          );
        }
      } else {
        await UserModel.findById(id).update({ role });
        updatedUser = await UserModel.findById(id).populate('projects').populate({
          path: 'cart',
          populate: { path: 'project' },
        });
      }
      return updatedUser;
    },

    /**
     * Deletes user by given id
     * @param parent
     * @param id
     * @returns {Promise<Query>}
     */
    async deleteUser(parent, { id }) {
      return UserModel.findById(id).remove();
    },
  },
};
