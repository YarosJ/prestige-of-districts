/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */

import * as jwt from 'jsonwebtoken';
import { UserInputError } from 'apollo-server-express';
import { secret } from '../../../config/config.json';
import paginate from './partials/paginate';
import { User, UserModel } from '../../../models/User';

interface RefreshToken {
  accessToken: string;
  refreshToken: string;
}

interface SignIn {
  accessToken: string;
  refreshToken: string;
  user: User;
}

/**
 * Users resolver.
 * Accepts input and converts it to commands for the users model.
 */

const userResolver = {
  Query: {

    /**
     * Finds users and paginate by cursor and limit
     */

    users(parent, { cursor, limit }): User[] {
      return UserModel.find({}, {
        role: 1, createdAt: 1, email: 1, dates: 1,
      }, paginate(cursor, limit));
    },

    /**
     * Finds user by given id
     */

    user(parent, { id }): User {
      return UserModel.findById(id, {
        role: 1, createdAt: 1, email: 1, targets: 1,
      });
    },
  },

  Mutation: {

    /**
     * Creates new user in DB
     */

    async signUp(parent, { email, password }): Promise <User> {
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
     */

    async signIn(parent, { email, password }): Promise <SignIn> {
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
     */

    async refreshToken(parent, { refreshToken }): Promise <RefreshToken> {
      const { _id, role } = jwt.verify(refreshToken, secret);

      return {
        accessToken: jwt.sign({ _id, role }, secret, { expiresIn: 900 }),
        refreshToken,
      };
    },

    /**
     * Adds access and refresh token to blacklist
     */

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async logOut(parent, { accessToken, refreshToken }): Promise <boolean> {
      // Add to blacklist
      return true;
    },

    /**
     * Finds user by given id and
     * update him by given params
     */

    async updateUser(parent, {
      id, role, previousPassword, newPassword,
    }): Promise <User> {
      if (previousPassword && newPassword) {
        const user = await UserModel.findOne({ _id: id });

        if (!user) {
          throw new UserInputError('Incorrect user ID');
        } else if (!user.validPassword(previousPassword)) {
          throw new UserInputError('Incorrect password');
        } else {
          await user.update({ password: newPassword });
        }
      } else {
        await UserModel.findById(id).update({ role });
      }

      return UserModel.findById(id);
    },

    /**
     * Deletes user by given id
     */

    async deleteUser(parent, { id }): Promise <User> {
      return UserModel.findById(id).remove();
    },
  },
};

export default userResolver;
