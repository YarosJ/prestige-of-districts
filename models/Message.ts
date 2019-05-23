import * as mongoose from 'mongoose';
import { prop, Typegoose } from 'typegoose';
import * as Location from './subfields/Location';

mongoose.Promise = require('bluebird');

/**
 * A model definition. Represents a database messages
 */

export class Message extends Typegoose {
  @prop({ required: true })
  public text: string;

  @prop({ required: true })
  public service: string;

  @prop()
  public locations: Location[];

  @prop({ required: true, default: Date.now })
  public happenedAt: Date;
}

export const MessageModel = new Message().getModelForClass(Message, {
  existingMongoose: mongoose,
  schemaOptions: { usePushEach: true }, // Currently is not supported by typegoose
});
