const assert = require('assert');
const app = require('../../src/app');

describe('\'config\' service', () => {
  it('registered the service', () => {
    const service = app.service('api/config');

    assert.ok(service, 'Registered the service');
  });
});
