var http = require('http');
var gh = require('./github');
gh.github_commits(github_callback);
var server = http.createServer(function(req, res) {
  res.writeHead(200);
  res.end('Hello Http');

});

function github_callback(data) {
    console.log(data);
}
server.listen(8080);
