const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  /* Create a reference to User model because every profile 
    should be associated with the user */
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'admin',
  },
  location: {
    type: String,
  },
  //Career Status/ Professional Status
  status: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
  },
  social: {
    youtube: {
      type: String,
    },
    twitter: {
      type: String,
    },
    facebook: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    instagram: {
      type: String,
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Profile = mongoose.model('adminProfile', ProfileSchema);
module.exports = Profile;
