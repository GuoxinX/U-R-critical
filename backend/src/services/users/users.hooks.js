const { authenticate } = require('@feathersjs/authentication').hooks;
const checkPermissions = require('feathers-permissions');

const {
  hashPassword, protect
} = require('@feathersjs/authentication-local').hooks;

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [checkPermissions({ roles: ['access nurse', 'admin'] })],
    get: [checkPermissions({ roles: ['access nurse', 'admin'] })],
    create: [checkPermissions({ roles: ['admin'] }), hashPassword()],
    update: [checkPermissions({ roles: ['admin', 'nurse'] }), hashPassword()],
    patch: [checkPermissions({ roles: ['admin', 'nurse'] }), hashPassword()],
    remove: [checkPermissions({ roles: ['admin'] })]
  },

  /*
  *For development
  */
  // before: {
  //   all: [],
  //   find: [],
  //   get: [],
  //   create: [hashPassword()],
  //   update: [hashPassword()],
  //   patch: [hashPassword()],
  //   remove: []
  // },


  after: {
    all: [
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect('password')
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
