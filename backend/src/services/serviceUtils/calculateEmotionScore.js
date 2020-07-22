/**
 * Calculate emotion score
 * @param {Object} hook       It carries the context from each request
 * @return {Number}
 */
const calculateEmotionScore = (hook) => {
  // get score config
  hook.app.service('api/config').find({ query: {} }).then(async (config) => {
    let ratingScores = await getRatingScores(hook, config.data[0]);
    let preferenceScores = await getPreferenceScores(hook, config.data[0]);
    let average = (ratingScores + preferenceScores) / config.data[0].averageTotal;
    updateEmotionScore(hook, average);
  });
};

/**
 * Calculate the sum of current rating scores
 * @param {Object} hook       It carries the context from each request
 * @param {Object} config     Stores the params/weights for score calculating
 * @return {Number}
 */
const getRatingScores = (hook, config) => {
  // prepare query
  let query = {
    $limit: config.averageTotal,
    $select: ['general_score', 'questions'],
    $sort: {
      createdAt: -1
    },
    nurse_username: hook.result.nurse_username
  };

  // get recent n ratings (n specified in config)
  return hook.app.service('api/ratings').find({ query }).then((result) => {
    let sum = 0;
    result.data.forEach(rate => {
      sum += rate.general_score;
    });
    return sum;
  });

};

/**
 * Calculate the sum of current preference scores
 * @param {Object} hook       It carries the context from each request
 * @param {Object} config     Stores the params/weights for score calculating
 * @return {Number}
 */
const getPreferenceScores = (hook, config) => {
  // prepare query
  let query = {
    $limit: config.averageTotal,
    $select: ['pressure_icon_ID'],
    $sort: {
      createdAt: -1
    },
    nurse_username: hook.result.nurse_username
  };

  // get recent n preferences (n specified in config)
  return hook.app.service('api/preferences').find({ query }).then((result) => {
    let sum = 0;
    result.data.forEach(preference => {
      
      // add weight specified in config for each option 
      switch (preference.pressure_icon_ID) {
      case 1:
        sum += config.pressure[0];
        break;
      case 2:
        sum += config.pressure[1];
        break;
      case 3:
        sum += config.pressure[2];
        break;
      default:
        console.log("Invalid Pressure Icon ID");
      }
    });
    return sum;
  });
};

/**
 * Update the emotion score of nurses
 * @param {Object} hook       It carries the context from each request
 * @param {Number} average    The emotion score in average
 */
const updateEmotionScore = (hook, average) => {
  hook.app.service('users').find({ query: { username: hook.result.nurse_username } }).then((result) => {
    let id = result.data[0]._id;
    hook.app.service('users').patch(id, { emotion_score: average });
  });
};

module.exports = {
  calculateEmotionScore
};


