import * as mongoose from 'mongoose';
import * as bcrypt from 'bcryptjs';
import {
  prop, Typegoose, instanceMethod, ModelType,
} from 'typegoose';

mongoose.Promise = require('bluebird');

/**
 * Schema for target sub field
 */

class Target {
  public tag: string;

  public latitude: number;

  public longitude: number;

  public radius: number;
}

/**
 * A model definition.  Represents a database for users
 */

export class User extends Typegoose {
  public salt: string;

  @prop({
    minlength: [6, 'Minimum length of username must be 6 characters'],
    trim: true,
    unique: true,
    required: true,
  })
  public email: string;

  @prop({
    required: true,
    unique: false,
  })
  public role: string;

  @prop({ required: true })
  public hashedPassword: string;

  @prop()
  public refreshToken?: string;

  @prop({ default: Date.now })
  public createdAt: Date;

  @prop()
  public targets: Target[];

  @prop()
  public set password(password) {
    this.salt = bcrypt.genSaltSync(10);
    this.hashedPassword = this.encryptPassword(password);
  }

  /**
   * Encrypting given password
   */

  @instanceMethod
  public encryptPassword(this: ModelType<User> & typeof User, password: string): string {
    return bcrypt.hashSync(password, this.salt);
  }

  /**
   * Comparing given password with hashed password
   */

  @instanceMethod
  public validPassword(this: ModelType<User> & typeof User, password: string): boolean {
    return bcrypt.compareSync(password, this.hashedPassword);
  }
}

export const UserModel = new User().getModelForClass(User, {
  existingMongoose: mongoose,
  schemaOptions: { usePushEach: true }, // Currently is not supported by typegoose
});
