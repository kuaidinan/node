var modelPhoto = require('../models/photo.js');
var path = require('path');
var fs = require('fs');

function routes(){
  this.list = function(req,res,next){
    modelPhoto.find({},function(err,photos){
      if(err) throw err;
      res.render('index',{
        title:'首页',
        photos:photos
      });
    })
  }
  this.photoForm = function(req,res,next){
    res.render('upload',{
      title:'上传图片页面'
    })
  }
  this.submit = function(req,res,next){
    var name = req.body.name || req.file.originalname;
    var option={
      name:name,
      path:req.file.originalname
    };
    var defaultPath = req.file.path;
    var newPath = req.file.destination +'\\' + req.file.originalname;
    fs.rename(defaultPath,newPath,function(err){
      if(err) throw err;
      modelPhoto.create(option,function(err){
        if(err) throw err;
        res.redirect('/');
      })
    })
  }
  this.download = function(dir){
    return function(req,res,next){
      var id = req.params.id;
      modelPhoto.findById(id,function(err,file){
        if(err) throw err;
        let downloadPath = path.join(dir,file.path);
        res.download(downloadPath);
      })
    }
  }
}

module.exports = new routes;