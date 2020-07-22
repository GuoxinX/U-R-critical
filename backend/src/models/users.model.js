// users-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

// Apply the uniqueValidator plugin to userSchema.
let uniqueValidator = require('mongoose-unique-validator');

module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const users = new mongooseClient.Schema({

    username: {
      type: String,
      unique: true,
      required: true
    },
    firstname: {
      type: String,
      require: true
    },
    password: {
      type: String,
      required: true
    },
    permissions: {
      type: String,
      required: true
    },
    reset_pin: {
      type: Boolean, default: false
    },
    first_login: {
      type: Boolean, default: true
    },
    emotion_score: {
      type: Number, default: 0
    }
  }, {
    timestamps: true
  });

  // Apply the uniqueValidator plugin to userSchema.
  // This means any unique attributes cannot be modified.
  users.plugin(uniqueValidator);

  return mongooseClient.model('users', users);
};
