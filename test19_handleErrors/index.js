var connect = require('connect');
// 各个接口 和 错误处理函数
var api = connect()
  .use(users)
  .use(pets)
  .use(errorHandler);

var app = connect()
  .use(hello)
  .use('/api', api)
  .listen(3000);



function hello(req, res, next) {
  if (req.url.match(/^\/hello/)) {
    res.end('hello world\n.');
  } else {
    next();
  }
}

var db = {
  users: [
    { name: 'tobi' },
    { name: 'loki' },
    { name: 'jane' }
  ]
}

function users(req, res, next) {
  var match = req.url.match(/^\/users\/(.+)/);
  if(match) {
    var user='';
    var flag = true;
    for(var item of db.users){
      if(item.name === match[1]){
        user = item.name;
        res.setHeader('Content-Type','application/json');
        res.end(JSON.stringify(item));
        flag = false;
        return;
      }
    }
    if(flag){
      var err = new Error('User not Found');
      err.NotFoud = true;
      next(err);
    }
  } else {
    next();
  }
}

function pets(req,res,next){
  if(req.url.match(/^\/pets\/(.+)/)){
    foo();
  }else{
    next();
  }
}

function errorHandler(err,req,res,next){
  console.error(err.stack);
  res.setHeader('Content-Type','application/json');
  if(err.NotFoud){
    res.statusCode = 404;
    res.end(JSON.stringify({error:err.message}));
  } else {
    res.statusCode = 500;
    res.end(JSON.stringify({error:'Interval Server  Error'}));
  }
}