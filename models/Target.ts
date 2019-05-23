// eslint-disable-next-line
/// <reference path="../index.d.ts" />

import * as mongoose from 'mongoose';
import { prop, post, Typegoose } from 'typegoose';

mongoose.Promise = require('bluebird');

/**
 * A model definition. Represents a database targets
 */

@post<Target>('save', (doc): void => {
  if (global.taskScheduler) {
    global.taskScheduler.addTasks([{
      body: {
        URL: doc.URL,
        tagPaths: doc.tagPaths,
        city: doc.city,
        country: doc.country,
      },
      interval: doc.freq,
    }]);
  }
})

@post<Target>('remove', (doc): void => {
  if (global.taskScheduler) {
    global.taskScheduler.deleteTasks([{
      URL: doc.URL,
      tagPaths: doc.tagPaths,
      city: doc.city,
      country: doc.country,
    }]);
  }
})

export class Target extends Typegoose {
  @prop({ required: true, unique: true })
  public URL: string;

  @prop({ default: [] })
  public tagPaths?: string[];

  @prop()
  public freq?: number;

  @prop()
  public service?: string;

  @prop()
  public city?: string;

  @prop()
  public country?: string;
}

export const TargetModel = new Target().getModelForClass(Target, {
  existingMongoose: mongoose,
  schemaOptions: { usePushEach: true }, // Currently is not supported by typegoose
});
