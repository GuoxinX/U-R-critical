const { authenticate } = require('@feathersjs/authentication').hooks;
const checkPermissions = require('feathers-permissions');
const { disallow } = require('feathers-hooks-common');

// this function will create a config in the database with default values if find method did not find the config
const createConfig = (hook) => {
  if (hook.result.total === 0) {
    let data = {};
    return hook.app.service('api/config').create(data).then((result) => {
      console.log(result);
      hook.result.data = result;
      return hook;
    }).catch(err => {
      console.log(err);
    });
  }
};

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [ checkPermissions({ roles: ['admin', 'access nurse'] }) ],
    get: [ checkPermissions({ roles: ['admin', 'access nurse'] }) ],
    create: [ disallow('external') ],
    update: [ checkPermissions({ roles: ['admin'] }) ],
    patch: [ checkPermissions({ roles: ['admin'] }) ],
    remove: [ disallow() ]
  },

  after: {
    all: [],
    find: [ hook => createConfig(hook)],
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
