import debugMongooseConnection from './debugMongooseConnection';
import { db } from './config.json';

/**
 * Configure a mongoose connection
 * @param callback - callback that fires after connecting
 */

const connect = (mongoose, process, callback): void => {
  mongoose.connect(process.env.DB || `mongodb://${db.host}:${db.port}/${db.name}`, {
    useMongoClient: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000,
  });

  mongoose.connection.on('connected', (): void => callback());

  debugMongooseConnection(mongoose, process);
};

export default connect;
