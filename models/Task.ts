import * as mongoose from 'mongoose';
import { prop, post, Typegoose } from 'typegoose';

mongoose.Promise = require('bluebird');

/**
 * A model definition. Represents a database tasks.
 */

@post<Task>('save', (doc): void => {
  if ((global as any).taskScheduler) {
    (global as any).taskScheduler.addTasks([{
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

@post<Task>('remove', (doc): void => {
  if ((global as any).taskScheduler) {
    (global as any).taskScheduler.deleteTasks([{
      URL: doc.URL,
      tagPaths: doc.tagPaths,
      city: doc.city,
      country: doc.country,
    }]);
  }
})

export class Task extends Typegoose {
  @prop({ required: true })
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

export const TaskModel = new Task().getModelForClass(Task, {
  existingMongoose: mongoose,
  schemaOptions: { usePushEach: true },
});
