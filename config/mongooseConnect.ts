import { db } from './config.json';
import debugMongooseConnection from './debugMongooseConnection';

/**
 * Configure a mongoose connection
 * @param mongoose
 * @param process
 * @param callback (callback)
 */

export default (mongoose, process, callback): void => {
  mongoose.connect(process.env.DB || `mongodb://${db.host}:${db.port}/${db.name}`, {
    useMongoClient: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000,
  });
  mongoose.connection.on('connected', (): void => callback());

  debugMongooseConnection(mongoose, process);
};
