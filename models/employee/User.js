/**
 * To create a model we need to create schema which
 * holds different fields for this particular resource to have
 */
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    resetToken: String,
    expireToken: Date
  },
  avatar: String,
  date: {
    type: Date,
    default: Date.now,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model('employee', UserSchema);
module.exports = User;
