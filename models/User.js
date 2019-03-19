const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const { Schema } = mongoose;
const bcrypt = require('bcryptjs');

/**
 * @description :: A model definition.  Represents a database for users.
 * @type {*|Mongoose.Schema}
 */

const UserSchema = new Schema({
  email: {
    type: String,
    minlength: [6, 'Minimum length of username must be 6 characters'],
    trim: true,
    unique: true,
    required: true,
  },
  role: {
    type: String,
    required: false, // Must be true!
    unique: false,
  },
  projects: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
  }],
  orders: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
  }],
  hashedPassword: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
    required: false,
  },
  createdAt: { type: Date },
  cart: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    optional: true,
    default: undefined,
    unique: false,
    required: true,
  }],
}, { usePushEach: true });

UserSchema.virtual('password')
  .set(function (password) {
    this.salt = bcrypt.genSaltSync(10);
    this.hashedPassword = this.encryptPassword(password);
  });

UserSchema.methods = {
  encryptPassword(password) {
    return bcrypt.hashSync(password, this.salt);
  },

  validPassword(password) {
    return bcrypt.compareSync(password, this.hashedPassword);
  },
};

export default mongoose.model('User', UserSchema);
