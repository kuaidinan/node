var http = require('http');
var server=http.createServer(function(req,res){
  var body = 'hello world';
  res.setHeader('Content-Length',body.length);
  res.setHeader('Content-Type','text/plain');
  res.end(body);
})
server.listen(1234);