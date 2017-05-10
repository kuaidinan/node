var connect =require('connect');
var bodyParser = require('body-parser');
var app = connect()
            .use(bodyParser.urlencoded({extended:false}))
            .use(bodyParser.text({ type: 'text/html' }))
            .use(function(req,res){
              console.log(req.body);
              console.log(req.files);
              console.log(req);
              res.end('thanks!');
            })
            .listen(3000);