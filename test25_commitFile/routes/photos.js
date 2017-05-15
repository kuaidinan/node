var Photo = require('../models/photo'); //引入Photo模型  
var path = require('path');
var fs = require('fs');

//显示图片列表  
exports.list = function (req, res, next) {
    Photo.find({}, function (err, photos) {
        if (err) return next(err);
        res.render('index', { title: '图片列表', photos: photos });
    });
}

//显示表单  
exports.form = function (req, res) {
    res.render('upload', { title: '图片上传' });
}

//上传图片  
exports.submit = function (dir) {
    return function (req, res, next) {
        var imgPath = req.file.path;
        var needPath = path.join(req.file.destination,req.file.originalname);
        var name = req.body.photoName || req.file.originalname;
        fs.rename(imgPath,needPath,function(err){
            if(err) throw err;
            Photo.create({ name: name, path: req.file.originalname }, function (err) {
                if (err) return next(err);
                res.redirect('/'); //跳转到首页
            });
        })
    };
}

//输出/下载图片
exports.download = function (dir) {
    return function (req, res, next) {
        var id = req.params.id;
        Photo.findById(id, function (err, photo) { //加载图片
            if (err) return next(err);
            var download_path = path.join(dir, photo.path); //构造下载路径
            //res.sendfile(download_path); //传输文件
            res.download(download_path); //下载文件
        });
    };
}