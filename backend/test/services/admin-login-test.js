// logs in as an administrator to the system, and retrieves the access token associated with the login

const userLogin = require('./user-login-test');

var accessToken = userLogin.userLoginRequest('admindhilan','chandra', true);


