
var fs = require('fs');
var express = require('express');
var jsonql = require('jsonql');
var app = express();

//app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
	res.send('Hello World');
});

app.get('/myfile', function(req, res){
	




	fs.readFile(__dirname + '/public/myfile', function(err, data){
		if(err) {
			console.log('Error: ' + err);
			res.send(err);
		}


		console.log(req.query.query)

		content = JSON.parse(data)

		answer = jsonql(req.query.query, content)

		console.log();

//res.send(content);
		res.send(JSON.stringify(answer));
		
	});





	//console.log(req.query.query);
	//res.send(req.query.query);

});


var server = app.listen(8080, function() {
	var host = server.address().address;
	var port = server.address().port;

	console.log('listening at http://%s:%s', host, port);
})