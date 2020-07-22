var http = require('http');
// standard connection information
var options = {
	  'method': 'POST',
	  'hostname': 'localhost',
	  'path': '/api/preferences',
	  'port': '3030',
	  'headers': {
		      'Content-Type': 'application/json'
		    }
};
// define the behaviour for handling the request
var req = http.request(options, function (res) {
	  var chunks = [];

	  res.on("data", function (chunk) {
		      chunks.push(chunk);
		    });

	  res.on("end", function (chunk) {
		      var body = Buffer.concat(chunks);
		      console.log(body.toString());
		    });

	  res.on("error", function (error) {
		      console.error(error);
		    });
});

// the data to put in the request
var sendData = {
	'nurse_username': 'nurse',
	'shift_type': 'N8',
	'shift_date': '2019-05-16',
	'comment': 'I feel so good',
	'section_icon_ID': '1',
	'pressure_icon_ID':'1',
	'is_Submitted': 'true',
	'submit_time': '2019-05-16T16:00:00+1000'
}

req.write(JSON.stringify(sendData));

req.end();
