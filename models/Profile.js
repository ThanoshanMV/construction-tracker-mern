const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  /* Create a reference to Person model because every profile 
    should be associated with the Person */
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Person',
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

const Profile = mongoose.model('PersonProfile', schema);
module.exports = Profile;
