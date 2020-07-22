const assert = require('assert');
const app = require('../../src/app');

describe('\'preferences\' service', () => {
  it('registered the service', () => {
    const service = app.service('api/preferences');
    assert.ok(service, 'Registered the service');
  });
  it('creat a preference', async()=>{
    const preference = await app.service('preference').create({
      nurse_username: 'test_nurse',
      shift_type: 'N12',
      shift_date: new Date( 2019,9,3,10),
      comment: 'i\'m good',
      section_icon_ID: 1,
      pressure_icon_ID: 1,
      is_Submitted: false,
      submit_time: new Date(2019,9,3,23)
    });

    assert.ok(preference,'created the preference');
  });
});
