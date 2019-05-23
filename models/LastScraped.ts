import * as mongoose from 'mongoose';
import { prop, Typegoose } from 'typegoose';

mongoose.Promise = require('bluebird');

/**
 * A model definition. Represents a database of last scraped text messages
 */

export class LastScraped extends Typegoose {
  @prop({ required: true })
  public text: string;

  @prop({ required: true, default: Date.now })
  public dateToDelete: Date;
}

export const LastScrapedModel = new LastScraped().getModelForClass(LastScraped, {
  existingMongoose: mongoose,
  schemaOptions: { usePushEach: true }, // Currently is not supported by typegoose
});
