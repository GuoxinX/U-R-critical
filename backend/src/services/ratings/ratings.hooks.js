const { authenticate } = require('@feathersjs/authentication').hooks;
const checkPermissions = require('feathers-permissions');
const { calculateEmotionScore } = require('../serviceUtils/calculateEmotionScore');
const { calculateRatingScore } = require('../serviceUtils/calculateRatingScore');
const { mapToObject } = require('../serviceUtils/mapToObject');


module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [checkPermissions({ roles: ['nurse', 'access nurse', 'admin'] })],
    get: [checkPermissions({ roles: ['nurse', 'access nurse', 'admin'] })],
    create: [checkPermissions({ roles: ['nurse', 'admin'] }), async hook => {hook.data.general_score = await calculateRatingScore(hook);  return hook;}],
    update: [checkPermissions({ roles: ['nurse', 'admin'] }), async hook => {hook.data.general_score = await calculateRatingScore(hook); return hook;}],
    patch: [checkPermissions({ roles: ['nurse', 'admin'] }), async hook => {hook.data.general_score = await calculateRatingScore(hook); return hook;}],
    remove: [checkPermissions({ roles: ['admin'] })]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [hook => calculateEmotionScore(hook), hook => {hook.result.questions = mapToObject(hook.result.questions); return hook;}],
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