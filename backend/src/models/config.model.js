// config-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const config = new Schema({
    /* pressure field stores array of scores for calculating emotion score from shift preference.
     * challenge -> pressure[0]
     * low day -> pressure[1]
     * exhausted -> pressure[2]
    */
    pressure: {
      type: [Number],
      default: [-5, 5, 10]
    },

    scoreWeight: { type: Number, default: 0.5 },

    emotionScoreWeight: { type: Number, default: 10 },

    /* questionWeights field stores array of scores for calculating emotion score from each question of shift rating.
     * q1 -> questionWeights[0]
     * q2 -> questionWeights[1]
     * q3 -> questionWeights[2]
     * q4 -> questionWeights[3]
    */
    questionWeights: {
      type: [Number],
      default: [25, 5, 10, 10]
    },

    // averageTotal field stores the number of total preferences/ratings scores that will be averaged while calculating emotion score for each user. 
    averageTotal: { type: Number, default: 5 },

    // threshhold for deciding the negative status for user
    thresholdUser: {
      type: [Number],
      default: [5, 10]
    },

    // threshhold for deciding the negative status for rating
    thresholdRating: {
      type: [Number],
      default: [22, 35]
    }

  }, {
    timestamps: true
  });

  return mongooseClient.model('config', config);
};
