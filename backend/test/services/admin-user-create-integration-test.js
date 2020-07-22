// logs into the system as an administrator, and then uses the access token with this login to conduct the 
// administrator request of creation of users

const userLogin = require('./user-login-test.js');
const userCreate = require('./user-create-test.js');

var accessToken = userLogin.userLoginRequest('admindhilan','chandra', true);

userCreate.userCreateRequest("ayeayrr","beebee", "random", accessToken);

