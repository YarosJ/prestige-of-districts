/* eslint-disable no-underscore-dangle */
import NodeCache from 'node-cache';

/**
 * Class TaskScheduler
 */
export default class TaskScheduler {
  constructor(tasks, config, callback) {
    this.myCache = new NodeCache({
      checkperiod: config.precision || 15,
    });
    this.addTasks(tasks);
    this._taskManager(callback);
  }

  /**
   * Adds tasks
   * @param tasks
   */
  addTasks(tasks) {
    tasks.forEach((t) => {
      const { interval, body } = t;
      if (!body || !interval) throw new Error('Invalid task body or interval');
      this.myCache.set(JSON.stringify(body), {
        body, interval: interval / 1000, // temporary
      }, interval / 1000); // temporary
    });
  }

  /**
   * Deletes tasks
   * @param tasks
   */
  deleteTasks(tasks) {
    tasks.forEach((t) => {
      this.myCache.del(JSON.stringify(t.body));
    });
  }

  /**
   * Managing tasks.
   * @param callback
   * @private
   */
  _taskManager(callback) {
    this.myCache.on('expired', (key, value) => {
      const { interval, body } = value;
      this.myCache.set(key, {
        body, interval,
      }, interval);
      callback(body);
    });
  }
}
