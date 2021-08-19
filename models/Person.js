/**
 * To create a model we need to create schema which
 * holds different fields for this particular resource to have
 */
 const mongoose = require('mongoose');

 const schema = new mongoose.Schema({
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
   avatar: {
     type: String
   },
   date: {
     type: Date,
     default: Date.now,
   },
   isAdmin: {
     type: Boolean,
     default: false
   },
   token: {
    resetTokenString: String,
    expireTokenDate: Date
  }
 });
 
 // Mongoose automatically looks for the plural, lowercased version of the model name for the collection's name. In our case collection name is "people"
 const Person = mongoose.model('Person', schema);
 module.exports = Person;
 