module.exports = {
    userCreateRequest: function createUser(usernameIn, passwordIn, permission = "random", accessTokenIn="none") {
        var http = require('http');
        const assert = require('assert');
        const util = require('./testing-utility-functions');
        const connectionInfo = require('./standard-connection-data');
        const options = connectionInfo.userPostOptions;
	var permissionIn;
        var emailIn = util.randomString(10).concat("@");
        var nameIn = util.randomString(10);
        
	if (permission === "random") {
		var permissions = ['nurse', 'access_nurse', 'admin'];
        	var permissionIn = permissions[Math.floor(Math.random() * permissions.length)]
	} else {
		if (permission === 'nurse' || permission === 'access_nurse' || permission === 'admin') {
			permissionIn = permission;
		}
		else {
			console.log("Invalid permission parameter");
			return;
		}
	}
        var req = http.request(options, function(res) {
            var chunks = [];

            res.on("data", function(chunk) {
                chunks.push(chunk);
            });

            res.on("end", function(chunk) {
                var body = Buffer.concat(chunks);
                console.log(body.toString());
                var jsonParsed = JSON.parse(body);
                // Ensure all fields are correct
                //assert.strictEqual(jsonParsed.username.toLowerCase(), usernameIn.toLowerCase());
                //assert.strictEqual(jsonParsed.email.toLowerCase(), emailIn.toLowerCase());
                //assert.strictEqual(jsonParsed.full_name.toLowerCase(), nameIn.toLowerCase());
                //assert.strictEqual(jsonParsed.permissions.toLowerCase(), permissionIn.toLowerCase());
                console.log("User Creation API Test PASSED");
            });

            res.on("error", function(error) {
                console.error(error);
            });

        });
	if (accessTokenIn === "none") {
        	var postData = {
        	    username: usernameIn,
        	    email: emailIn,
        	    password: passwordIn,
        	    permissions: permissionIn,
        	    full_name: nameIn,
        	}
	} else {
		var postData = {
		    username: usernameIn,
		    email: emailIn,
		    password: passwordIn,
		    permissions: permissionIn,
		    full_name: nameIn,
		    accessToken: accessTokenIn
		}
	}
        // send the request
        req.write(JSON.stringify(postData));

        req.end();

	console.log('User create test has executed');
    }

}
