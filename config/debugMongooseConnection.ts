const debugMongoose = require('debug')('mongoose');

/**
 * Indicates the status of a mongoose connection
 * @param mongoose
 * @param process
 */

export default (mongoose, process): void => {
  mongoose.connection.on('open', (): void => {
    debugMongoose('Mongoose connection open');
  });

  mongoose.connection.on('close', (): void => {
    debugMongoose('Mongoose connection close');
  });

  process.on('SIGINT', (): void => {
    mongoose.connection.close((): void => {
      debugMongoose('Mongoose disconnected on app termination');
      process.exit(0);
    });
  });
};
