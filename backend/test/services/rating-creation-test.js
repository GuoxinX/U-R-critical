var http = require('http');

var options = {
	  'method': 'POST',
	  'hostname': 'localhost',
	  'path': '/api/ratings',
	  'headers': {
		      'Content-Type': 'application/json'
		    }
};

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

var postData =  "{\n\t\"nurse_username\": \"Postman1\",\n\t\"shift_type\": \"N8\",\n\t\"shift_date\": \"2019-05-16\",\n\t\"is_Submitted\": true,\n\t\"score\": 0,\n\t\"emotion_icon_ID\": 4,\n\t\"comment\": \"good\",\n\t\"questions\":[{\"q1\": true}, {\"q2\": false}, {\"q3\": true}, {\"q3a\": true}],\n\t\"submit_time\": \"2019-05-16T16:00:00+1000\"\n}";

var postDataSend = {
	'nurse_username': 'Postman1',
	'shift_type': 'N8',
	'shift_date': '2019-05-18',
	'is_Submitted': 'true',
	'score': '0',
	'emotion_icon_ID': '4',
	'comment': 'good',
	'q1':'true',
	'q2':'false',
	'q3':'true',
	'q3a':'true',
	'submit_time': '2019-05'
}

req.write(postData);

req.end();
