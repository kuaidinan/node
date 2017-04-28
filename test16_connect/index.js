var connect = require('connect');

var setup =require('./utils/setup.js');

// function logger(req, res, next){
//   console.log('%s %s', req.method, req.url);
//   next();
// }

function hello(req, res){
  res.setHeader('Content-Type','text/plain');
  res.end('hello world');
}

connect().use(setup(':method :url')).use(hello).listen(3000);