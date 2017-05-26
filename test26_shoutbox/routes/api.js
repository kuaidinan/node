var express =require('express');
var User = require('../lib/user');
var basicAuth = require('basic-auth');

exports.auth = function(req,res,next){
  var credentials = basicAuth(req);

  if (!credentials || credentials.name !== 'xq' || credentials.pass !== '123') {
    res.statusCode = 401
    res.setHeader('WWW-Authenticate', 'Basic realm="example"')
    res.end('Access denied')
  } else {
    next();
  }
};

exports.user = function(req,res,next){
  User.get(req.params.id,function(err,user){
    if (err) return next(err);
    if (!user.id) return res.send(404);
    res.json(user);
  })
}