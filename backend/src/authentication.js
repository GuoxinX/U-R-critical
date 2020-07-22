const authentication = require('@feathersjs/authentication');
const jwt = require('@feathersjs/authentication-jwt');
const local = require('@feathersjs/authentication-local');


module.exports = function (app) {
  const config = app.get('authentication');

  // Set up authentication with the secret
  app.configure(authentication(config));
  app.configure(jwt());
  app.configure(local());

  // The `authentication` service is used to create a JWT.
  // The before `create` hook registers strategies that can be used
  // to create a new valid JWT (e.g. local or oauth2)
  app.service('authentication').hooks({
    before: {
      create: [
        authentication.hooks.authenticate(config.strategies)
      ],
      remove: [
        authentication.hooks.authenticate('jwt')
      ]
    },
    after: {
      create: [
        hook => {
          // return required data while logged in.
          hook.result.id = hook.params.user._id;
          hook.result.username = hook.params.user.username;
          hook.result.firstname = hook.params.user.firstname;
          hook.result.permissions = hook.params.user.permissions.replace(/^\s+/g, '').replace(/\s+$/g, '');
          hook.result.reset_pin = hook.params.user.reset_pin;
          hook.result.first_login = hook.params.user.first_login;
        }
      ],
      remove: [
      ]
    }
  });
};