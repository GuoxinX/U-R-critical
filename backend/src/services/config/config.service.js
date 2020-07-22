// Initializes the `config` service on path `/api/config`
const createService = require('feathers-mongoose');
const createModel = require('../../models/config.model');
const hooks = require('./config.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/api/config', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('api/config');

  service.hooks(hooks);
};
