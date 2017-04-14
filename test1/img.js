var http = require('http');
var fs = require('fs');
http.createServer(function(req,res){
  res.writeHead(200,{'Content-type':'image/png'});
  fs.createReadStream('./img/test.png').pipe(res);
}).listen(3000);
console.log('my server is start,my port is %s',3000)