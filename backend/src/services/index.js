const users = require('./users/users.service.js');
const preferences = require('./preferences/preferences.service.js');
const ratings = require('./ratings/ratings.service.js');
const resetPassword = require('./reset-password/reset-password.service.js');
const trendAnalysis = require('./trend-analysis/trend-analysis.service.js');
const config = require('./config/config.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(preferences);
  app.configure(ratings);
  app.configure(resetPassword);
  app.configure(trendAnalysis);
  app.configure(config);
};