var parse = require('url').parse;
// 闭包返回一个函数
module.exports = function route(obj) {
  return function(req, res, next){
    // 判断请求方式是否有效
    if (!obj[req.method]){
      next();
      return;
    }
    // 地址
    var routes = obj[req.method];
    // 请求地址
    var url = parse(req.url);
    // 访问资源的路径
    var paths = Object.keys(routes);
    // 循环匹配
    for (var i = 0; i<paths.length; i++) {
      var path = paths[i];
      var fn = routes[path];
      // 编写正则
      path = path
              .replace(/\//g,'\\/')
              .replace(/:(\w+)/g,'([^\\/]+)');
      var re = new RegExp('^' + path + '$');
      // 是否匹配到
      var captures = url.pathname.match(re);
      // match返回后有值 执行预先的函数 未匹配到则跳出
      if (captures) {
        var args = [req,res].concat(captures.splice(1));
        fn.apply(null,args);
        return;
      }
    }
    next();
  }
}