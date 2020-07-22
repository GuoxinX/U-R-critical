module.exports = {
    userLoginRequest : function userLoginRequest(loginUsername, loginPassword, returnAccessToken = false) {
	const assert = require('assert');
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
	var accessToken;
        var req = http.request(options, function(res) {
            var chunks = [];

            res.on("data", function(chunk) {
                chunks.push(chunk);
            });

            res.on("end", function(chunk) {
                var body = Buffer.concat(chunks);
                console.log(body.toString());
            	//TODO: require assert
		var jsonParsed = JSON.parse(body);
		assert.strictEqual(jsonParsed.username.toLowerCase(), loginUsername.toLowerCase());
		console.log("User Login API Test PASSED");
	    	if (returnAccessToken == true) {
			accessToken = jsonParsed.accessToken;
			console.log(accessToken);
		}
	    });

            res.on("error", function(error) {
                console.error(error);
            });
        });


        postData = {
            username: loginUsername,
            password: loginPassword,
            strategy: 'local'
        }

        console.log("About to write the log in request");

        req.write(JSON.stringify(postData));
        req.end();
        console.log('End of integration test code');
	if (returnAccessToken) {
		return accessToken;
	}
	return 0;
    }
}
