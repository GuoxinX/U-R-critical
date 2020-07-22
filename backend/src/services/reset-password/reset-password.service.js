// Initializes the `resetPassword` service on path `/reset-password`
const createService = require('feathers-mongoose');
const hooks = require('./reset-password.hooks');

module.exports = function (app) {
  const Model = app.services.users.Model;
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/reset-password', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('reset-password');

  service.hooks(hooks);
};
