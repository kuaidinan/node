var mongoose = require('mongoose');  
  
mongoose.connect('mongodb://localhost/photo_app'); //连接本地photo_app数据库  
var schema = new mongoose.Schema({name: String, path: String});  
module.exports = mongoose.model('Photo', schema);