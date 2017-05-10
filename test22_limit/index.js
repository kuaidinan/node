var connect = require('connect');
var bodyParser = require('body-parser');
var getRawbody = require('raw-body');
var contentType = require('content-type');
var app = connect()
            .use(function(req,res,next){
              getRawbody(req,{
                length:req.headers['content-length'],
                limit:'32kb',
                encoding:contentType.parse(req).parameters.charset
              },function(err,string){
                if(err) return next(err);
                req.text = string;
                next();
              })
            })
            .use(function(req,res){
              console.log(1);
              console.log(req.text.toString());
            })
            .listen(3000);