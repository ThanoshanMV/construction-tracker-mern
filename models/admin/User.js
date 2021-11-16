/**
 * To create a model we need to create schema which
 * holds different fields for this particular resource to have
 */
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
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
    default: true,
  },
});

const User = mongoose.model('admin', UserSchema);
module.exports = User;
