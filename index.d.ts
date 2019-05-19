// eslint-disable-next-line @typescript-eslint/no-unused-vars
import TaskScheduler from './libs/TaskScheduler';

declare global {
  namespace NodeJS {
    interface Global {
      taskScheduler: TaskScheduler;
    }
  }
}
