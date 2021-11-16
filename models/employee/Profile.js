const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  /* Create a reference to User model because every profile 
    should be associated with the user */
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'employee',
  },
  location: String,
  //Career Status/ Professional Status
  status: {
    type: String,
    required: true,
  },
  bio: String,
  social: {
    youtube: String,
    twitter: String,
    facebook: String,
    linkedin: String,
    instagram: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Profile = mongoose.model('employeeProfile', ProfileSchema);
module.exports = Profile;
