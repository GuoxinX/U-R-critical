var http = require('http');

var options = {
	  'method': 'GET',
	  'hostname': 'localhost',
	  'port' : '3030',
	  'path': '/api/ratings?',
	  'accessToken' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6ImFjY2VzcyJ9.eyJ1c2VySWQiOiI1ZDhkYWNiNDcyZDNhNDRkODRiODI4MTQiLCJpYXQiOjE1NzExMjEwMjMsImV4cCI6MTU3MTIwNzQyMywiYXVkIjoiaHR0cHM6Ly95b3VyZG9tYWluLmNvbSIsImlzcyI6ImZlYXRoZXJzIiwic3ViIjoiYW5vbnltb3VzIiwianRpIjoiNjdiNGM0OWQtMTFhYS00NjQzLThkYzgtMzcwNmYxNjE2NmY5In0.tc96rfV163USv1FW6fJ7VDQwgAtuE1MlVWHZn_vBbz0',
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
req.write(JSON.stringify(options));
req.end();
