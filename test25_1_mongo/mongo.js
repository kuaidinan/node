var mongoose = require('mongoose');
// 连接
var db =mongoose.connect('mongodb://localhost/test');


mongoose.connection.on('connected',function(){
  console.log(1);
})
mongoose.connection.on('error',function(){
  console.log(2);
})
mongoose.connection.on('disconnected',function(){
  console.log(3);
})

//数据模型
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username:{type:String},
  userpwd:{type:String},
  userage:{type:Number},
  logindate:{type:Date}
})


var User = mongoose.model('User',UserSchema);
// 添加数据
function insert(){
  var user = new User({
    username:'xq',
    userpwd:'abc',
    userage:18,
    logindate:new Date()
  });
  user.save(function(err,res){
    if(err){
      console.log("Error:" + err);
    }
    else {
      console.log("Res:" + res);
    }
  });
}
insert();