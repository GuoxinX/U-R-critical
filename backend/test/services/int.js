// creates a nurse user, logs in with those user details, and uses the access token to complete
// an action
const userCreate = require('./user-create-test');

var http = require('http');

var util = require('./testing-utility-functions')

usernameString = util.randomString(8) + "xxyyzz ";
passwordString = util.randomString(8) + "xxyyzz ";

console.log("PASSWORD STRING IS" + passwordString);

userCreate.userCreateRequest(usernameString, passwordString);

function userLoginRequest() {
    setTimeout(randomLog, 10000);

    var http = require('http');

    var options = {
        'method': 'POST',
        'hostname': 'localhost',
        'path': '/authentication',
        'port': '3030',
        'headers': {
            'Content-Type': 'application/json'
        }
    };

    var req = http.request(options, function(res) {
        var chunks = [];

        res.on("data", function(chunk) {
            chunks.push(chunk);
        });

        res.on("end", function(chunk) {
            var body = Buffer.concat(chunks);
            console.log(body.toString());
        });

        res.on("error", function(error) {
            console.error(error);
        });
    });


    postData = {
        username: usernameString,
        password: passwordString,
        strategy: 'local'
    }

    function randomLog() {
        console.log("This is a random log");
    }

    console.log("About to write the log in request");

    req.write(JSON.stringify(postData));
    req.end();
    console.log('End of integration test code');
}

setTimeout(userLoginRequest, 5000);
