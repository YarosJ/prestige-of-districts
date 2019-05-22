import * as mongoose from 'mongoose';
import { prop, Typegoose } from 'typegoose';

mongoose.Promise = require('bluebird');

/**
 * A model definition. Represents a database for permissions.
 */

export class Permission extends Typegoose {
  @prop({ required: true, unique: true })
  public role: string;

  @prop({ default: [] })
  public actions: string[];
}

export const PermissionModel = new Permission().getModelForClass(Permission, {
  existingMongoose: mongoose,
  schemaOptions: { usePushEach: true }, // Currently is not supported by typegoose
});
