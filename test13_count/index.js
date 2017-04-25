var http = require('http');
var parse = require('url').parse;
var counter = 0;
var server = http.createServer(function(req,res){
  console.log(parse(req.url));
  counter++;
  console.log(counter);
  res.write('I have been accessed ' + counter + ' times.');
  res.end();
}).listen(8888);