var redis = require('redis');
var bcrypt = require('bcrypt');
var db = redis.createClient();
db.auth('hello');

module.exports = Users;

function Users(obj) {
  for (var key in obj) {
    this[key] = obj[key];
  }
}

Users.prototype.save = function (fn) {
  if (this.id){
    this.update(fn);
  } else {
    var user = this;
    db.incr('user:ids',function(err,id){
      if (err) return fn(err);
      user.id = id;
      user.hashPassword(function(err){
        if (err) return fn(err);
        user.update(fn);
      })
    })
  }
}

Users.prototype.update = function(fn){
  var user = this;
  var id = user.id;
  db.set('user:id:' + user.name,id,function(err){
    if (err) return fn(err);
    var userObj = {};
    for(var key in user){
      if(user.hasOwnProperty(key)){
        userObj[key] = user[key];
      }
    }
    console.log(userObj);
    db.hmset('user:' + id, userObj, function(err){
      fn(err);
    });
  });
};

Users.prototype.hashPassword = function(fn) {
  var user = this;
  bcrypt.genSalt(12, function(err,salt){
    if(err) return fn(err);
    user.salt = salt;
    bcrypt.hash(user.pass,salt,function(err,hash){
      if (err) return fn(err);
      user.pass = hash;
      fn();
    })
  })
}

var test = new Users({
  name:'xq',
  pass:'im a xq',
  age:'18'
});
test.save(function(err){
  if (err) throw err;
  console.log('user id %d',test.id);
})