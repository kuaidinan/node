// const http = require('http');
// http.createServer(function(req,res){
//   res.writeHead(200,{'Content-type':'text/plain'});
//   res.end('hello wolrd');
// }).listen('3000');

// console.log('my server is start ,my port is %s','3000');

const http = require('http');
const server = http.createServer();
server.on('request',function(req,res){
  res.writeHead(200,{'Content-type':'text/plain'});
  res.end('hello world1');
})

server.listen('3000');

console.log('my server is start ,my port is %s','3000');
