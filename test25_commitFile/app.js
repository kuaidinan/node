var express = require('express');
var app = express();
var path = require('path');
var multer = require('multer');

app.set('views',path.join(__dirname,'photos'));
app.set('view engine','ejs');

var photos = require('./routes/photos'); // 自定义路由模块  
app.set('photos', path.join(__dirname, 'public/photos')); //图片文件夹路径

var upload = multer({dest:app.get('photos')});
  
app.get('/', photos.list);  
app.get('/upload', photos.form);  
app.post('/upload', upload.single('photoImage'),photos.submit());  
app.get('/photo/:id/download', photos.download(app.get('photos')));

app.use(express.static(path.join(__dirname,'public')));

app.listen('3000',function(err){
  if(err) throw err;
  console.log('server is start,port is %s',3000);
});