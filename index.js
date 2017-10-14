var http = require('http');
var gh = require('./github');
var server = http.createServer(function(req, res) {
  res.writeHead(200);
  res.end('Hello Http');

});

var express = require('express');
var app = express();
var server = require('http').Server(app);

app.get('/github', function (req, res) { 
	/
	gh.github_commits(res.send.bind(res));
});
server.listen(8080);
