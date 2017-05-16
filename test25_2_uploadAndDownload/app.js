var express = require('express');
var app = express();
var path = require('path');
var routes = require('./routes/photo.js');
var multer = require('multer');
app.set('photoStatic',path.join(__dirname,'static'));
var upload = multer({dest:app.get('photoStatic')});
// 设置视图根目录
app.set('views','views');
// 设置express 模板引擎
app.set('view engine','ejs');
// 设置静态文件目录
app.use(express.static(path.join(__dirname,'static')));

// 图片列表接口
app.get('/',routes.list);
// 上传图片页面
app.get('/upload',routes.photoForm);
// 上传图片接口
app.post('/upload',upload.single('photo'),routes.submit);
// 下载图片接口
app.get('/photo/:id/download',routes.download(app.get('photoStatic')));

app.listen('3000',function(err){
  if(err) throw err;
  console.log('my server is start , port is %s',3000);
})