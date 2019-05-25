/* eslint-disable @typescript-eslint/no-unused-vars */

import TaskScheduler from './libs/TaskScheduler';

/**
 * Here declared global types
 */

declare global {
  namespace NodeJS {
    interface Global {
      taskScheduler: TaskScheduler;
    }
  }
}
