module.exports = {
	    createShiftPreference: function createShiftPreferenceTest(accessTokenIn, username, shiftType, shiftDate) {
		            var http = require('http');
		            var options = {
				                'method': 'POST',
				                'hostname': 'localhost',
				                'path': '/api/preferences',
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

		            var postData = {
				    accessToken : accessTokenIn,
				    		nurse_username: username,
				                shift_type: shiftType,
				                shift_date: shiftDate,
				            }


		            req.write(JSON.stringify(postData));

		            req.end();
		        }
}
