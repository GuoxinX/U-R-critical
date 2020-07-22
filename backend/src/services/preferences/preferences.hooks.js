const { authenticate } = require('@feathersjs/authentication').hooks;
const checkPermissions = require('feathers-permissions');
const { calculateEmotionScore } = require('../serviceUtils/calculateEmotionScore');

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [checkPermissions({ roles: ['nurse', 'access nurse', 'admin'] })],
    get: [checkPermissions({ roles: ['nurse', 'access nurse', 'admin'] })],
    create: [checkPermissions({ roles: ['nurse', 'admin'] })],
    update: [checkPermissions({ roles: ['nurse', 'admin'] })],
    patch: [checkPermissions({ roles: ['nurse', 'admin'] })],
    remove: [checkPermissions({ roles: ['admin'] })]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [hook => calculateEmotionScore(hook)],
    update: [hook => calculateEmotionScore(hook)],
    patch: [hook => calculateEmotionScore(hook)],
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
