// Initializes the `trend-analysis` service on path `/api/trend-ayalysis`
const createService = require('./trend-analysis.class.js');
const hooks = require('./trend-analysis.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/api/trend-ayalysis', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('api/trend-ayalysis');

  service.hooks(hooks);
};
