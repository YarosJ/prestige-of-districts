const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const { Schema } = mongoose;
const bcrypt = require('bcryptjs');

/**
 * Schema for target sub field
 * @type {*|Mongoose.Schema}
 */
const targetSchema = new Schema({
  tag: String,
  latitude: Number,
  longitude: Number,
  radius: Number,
});

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
  hashedPassword: { type: String, required: true },
  refreshToken: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
  targets: [targetSchema],
}, { usePushEach: true });

// eslint-disable-next-line func-names
UserSchema.virtual('password').set(function (password) {
  this.salt = bcrypt.genSaltSync(10);
  this.hashedPassword = this.encryptPassword(password);
});

UserSchema.methods = {
  /**
   * Encrypting given password
   * @param password
   * @returns {string|?string}
   */
  encryptPassword(password) {
    return bcrypt.hashSync(password, this.salt);
  },

  /**
   * Comparing given password with hashed password
   * @param password
   * @returns {boolean}
   */
  validPassword(password) {
    return bcrypt.compareSync(password, this.hashedPassword);
  },
};

export default mongoose.model('User', UserSchema);
