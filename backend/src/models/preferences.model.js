// preferences-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
// let uniqueValidator = require('mongoose-unique-validator');

module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const preferences = new Schema({

    nurse_username: { type: String, required: true },
    firstname: {type: String, required: true },
    shift_type: { type: String, required: true },
    shift_date: { type: Date, required: true },
    comment: { type: String },
    section_icon_ID: { type: Number },
    pressure_icon_ID: { type: Number },
    is_Submitted: { type: Boolean, default: false },
    submit_time: { type: Date }

  }, {
    timestamps: true
  });

  // Apply the uniqueValidator plugin to userSchema.
  // preferences.plugin(uniqueValidator);

  return mongooseClient.model('preferences', preferences);
};
