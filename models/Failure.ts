import * as mongoose from 'mongoose';
import { prop, Typegoose } from 'typegoose';
import * as Location from './subfields/Location';

mongoose.Promise = require('bluebird');

/**
 * A model definition. Represents a database failures.
 */

export class Failure extends Typegoose {
  @prop({ required: true })
  public text: string;

  @prop({ required: true })
  public service: string;

  @prop({ required: true })
  public failureType: string;

  @prop()
  public locations: Location[];

  @prop({ required: true, default: Date.now })
  public happenedAt: Date;
}

export const FailureModel = new Failure().getModelForClass(Failure, {
  existingMongoose: mongoose,
  schemaOptions: { usePushEach: true }, // Currently is not supported by typegoose
});
