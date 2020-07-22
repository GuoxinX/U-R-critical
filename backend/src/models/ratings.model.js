// ratings-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
// let uniqueValidator = require('mongoose-unique-validator');

module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const ratings = new Schema({

    nurse_username: { type: String, required: true },
    firstname: {type: String, required: true },
    shift_type: { type: String, required: true },
    shift_date: { type: Date, required: true },
    score: { type: Number },
    emotion_icon_ID: { type: Number },
    comment: { type: String },
    questions: {
      type: Map,
      of: Boolean
    },
    is_Submitted: { type: Boolean, default: false },
    submit_time: { type: Date },
    general_score: { type: Number, default: 0 }
  }, {
    timestamps: true
  });

  // Apply the uniqueValidator plugin to userSchema.
  // ratings.plugin(uniqueValidator);

  return mongooseClient.model('ratings', ratings);
};
