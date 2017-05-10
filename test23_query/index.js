var connect = require('connect');
var qs = require('qs');
var app = connect()
        .use(function(req,res,next){
          // res.setHeader('Content-Type','application/json');
          // res.end(JSON.stringify(qs.parse(req)));
          console.log(req.query);
          res.end('hello');
        })
        .listen(3000);