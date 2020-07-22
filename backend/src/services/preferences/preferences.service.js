// Initializes the `preferences` service on path `/api/preferences`
const createService = require('feathers-mongoose');
const createModel = require('../../models/preferences.model');
const hooks = require('./preferences.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/api/preferences', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('api/preferences');

  service.hooks(hooks);
};
