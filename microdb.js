var fs = require('fs');
var express = require('express');
var jsonql = require('jsonql');

var app = express();
var router = express.Router();
var fileDirectory = __dirname + '/public';


router.get('/', function(req, res){
	res.send('Hello World')
});

fs.readdirSync(fileDirectory).forEach(function(file){
	router.get('/' + file, function(req, res){
		fs.readFile(fileDirectory + '/' + file, function(err, data){
			if(err) {
				console.log('Error: ' + err);
				res.send(err);
			}

			content = JSON.parse(data);

			queryString = '$';

			if(Object.keys(req.query).length !== 0 ) 
				queryString += '.' + req.query.query;

			res.json(jsonql(queryString, content));
		});
	});
});

app.use('/', router)

var server = app.listen(8080, function() {
	var host = server.address().address;
	var port = server.address().port;

	console.log('listening at http://%s:%s', host, port);
})