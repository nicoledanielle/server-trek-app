'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

mongoose.Promise = global.Promise;

const UserSchema = mongoose.Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

//performance is an array with node objects containing info about the word/response/correct  

UserSchema.methods.apiRepr = function(){
  return {
    id: this._id,
    firstname: this.firstname,
    lastname: this.lastname,
    username: this.username
  };
};

UserSchema.methods.validatePassword = function(password) {
  return bcrypt.compare(password, this.password);
};

UserSchema.statics.hashPassword = function(password) {
  return bcrypt.hash(password, 10);
};


const User = mongoose.model('User', UserSchema);

module.exports = { User };