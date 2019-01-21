const debugMongoose = require('debug')('mongoose');

/**
 * Indicates the status of a mongoose connection
 * @param mongoose
 * @param process
 */

export default (mongoose, process) => {
  mongoose.connection.on('open', () => {
    debugMongoose('Mongoose connection open');
  });

  mongoose.connection.on('close', () => {
    debugMongoose('Mongoose connection close');
  });

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      debugMongoose('Mongoose disconnected on app termination');
      process.exit(0);
    });
  });
};
