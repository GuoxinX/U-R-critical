// creates a nurse user, logs in with those user details, and uses the access token to complete
// an action
const userCreate = require('./user-create-test');
const userLogin = require('./user-login-test');
const shiftPreferenceCreate = require('./create-shift-preference-test');
const util = require('./testing-utility-functions');
usernameString = util.randomString(15);
passwordString = util.randomString(15);


userCreate.userCreateRequest(usernameString, passwordString, 'nurse');
setTimeout(userLogin.userLoginRequest, 5000, usernameString, passwordString);
//setTimeout(shiftPreferenceCreate.createShiftPreference, 8000, "aCcEss", "username", "shifttype", "shiftdate");

