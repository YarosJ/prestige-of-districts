import * as NodeCache from 'node-cache';

/**
 * Runs callback by given interval and data for each tasks
 */

export default class TaskScheduler {
  protected myCache: NodeCache;

  public constructor(tasks, config, callback) {
    this.myCache = new NodeCache({
      checkperiod: config.precision || 15, // seconds
    });

    this.addTasks(tasks);
    this.taskManager(callback);
  }

  public addTasks(tasks): void {
    tasks.forEach((t): void => {
      const { interval, body } = t;

      if (!body || !interval) throw new Error('Invalid task body or interval');

      this.myCache.set(JSON.stringify(body), {
        body, interval,
      }, interval);
    });
  }

  public deleteTasks(tasks): void {
    tasks.forEach((t): void => {
      this.myCache.del(JSON.stringify(t.body));
    });
  }

  protected taskManager(callback): void {
    this.myCache.on('expired', (key, value): void => {
      const { interval, body } = value;

      this.myCache.set(key, {
        body, interval,
      }, interval);
      callback(body);
    });
  }
}
