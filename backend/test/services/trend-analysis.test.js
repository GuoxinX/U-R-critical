const assert = require('assert');
const app = require('../../src/app');

describe('\'trend-analysis\' service', () => {
  it('registered the service', () => {
    const service = app.service('api/trend-ayalysis');

    assert.ok(service, 'Registered the service');
  });
});
