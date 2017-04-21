var http = require('http');
var url = "https://www.baidu.com";
var body = `<p>跳转到<a href=${url}>百度</a></p>`;


var server = http.createServer(function(req,res){
  res.setHeader('Location', url);
  res.setHeader('Content-Length',body.length);
  res.setHeader('Content-type','text/html');
  res.statusCode = 302;
  res.end(body);
})

server.listen(3333);