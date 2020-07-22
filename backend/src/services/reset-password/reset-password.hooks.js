const { authenticate } = require('@feathersjs/authentication').hooks;
const checkPermissions = require('feathers-permissions');
const { disallow } = require('feathers-hooks-common');

const {
  hashPassword, protect
} = require('@feathersjs/authentication-local').hooks;

// this function validates the incomming data with property and length
const validate = (hook) => {

  let context = hook.arguments[1];

  // validate length
  if (Object.keys(context).length != 2) {
    throw new Error('Invalid context');
  }

  // validate property
  if (!context.hasOwnProperty('reset_pin') || !context.hasOwnProperty('password')){
    throw new Error('Invalid context field');
  }
};

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [disallow()],
    get: [disallow()],
    create: [disallow()],
    update: [disallow()],
    patch: [checkPermissions({ roles: ['nurse', 'access nurse', 'admin'] }), hook => validate(hook), hashPassword()],
    remove: [disallow()]
  },

  after: {
    all: [protect('password')],
    patch: []
  },

  error: {
    all: [],
    patch: []
  }
};
