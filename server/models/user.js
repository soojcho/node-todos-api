var mongoose = require('mongoose');

var User = mongoose.model('User',{
  User:{
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  email:{
    type: String,
    required: true,
    minlength: 1,
    trim: true
  }
});

module.exports = {User};
