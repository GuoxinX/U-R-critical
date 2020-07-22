/**
 * Calculate rating score
 * @param {Object} hook       It carries the context from each request
 * @return {Number}
 */
const calculateRatingScore = (hook) => {
  // get score config and return the overall score of incoming rating
  return hook.app.service('api/config').find({ query: {} }).then((config) => {
    let score = 0;
    score += (5 - hook.data.score) * config.data[0].scoreWeight;
    score += 'q1' in hook.data.questions && hook.data.questions.q1 == true ? config.data[0].questionWeights[0] : 0;
    score += 'q2' in hook.data.questions && hook.data.questions.q2 == false ? config.data[0].questionWeights[1] : 0;
    score += 'q3' in hook.data.questions && hook.data.questions.q3 == true ? config.data[0].questionWeights[2] : 0;
    score += 'q3a' in hook.data.questions && hook.data.questions.q3a == false ? config.data[0].questionWeights[3] : 0;
    return score;
  });
};

module.exports = {
  calculateRatingScore
};
