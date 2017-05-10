var connect = require('connect');
var app = connect()
            .use(function(req,res){
              res.setHeader('Set-Cookie',['tobi=ferret;Expires =Tue,08 Jun 2021 10:18:14 GMT','foo=bar']);
              res.end();
            }).listen(3000);