var express = require('express');
var path = require('path');
var app = express();

var list = require('./routes/list.js');

app.set('views',path.join(__dirname,'views'));

app.set('view engine','ejs');

app.use('/list',list);

app.listen(3000,function(err){
  if(err) throw err;
  console.log('my server is start,my port is %s',3000);
})

