var parse = require('url').parse;
module.exports = function route(obj) {
  return function(req, res, next){
    if (!obj[req.method]){
      next();
      return;
    }
    var routes = obj[req.method];
    var url = parse(req.url);
    var paths = Object.keys(routes);
    for (var i = 0; i<paths.length; i++) {
      var path = paths[i];
      var fn = routes[path];
      path = path
              .replace(/\//g,'\\/')
              .replace(/:(\w+)/g,'([^\\/]+)');
      var re = new RegExp('^' + path + '$');
      console.log(url.pathname);
      console.log(re);
        var captures = url.pathname.match(re);
        console.log(captures);
        if (captures) {
          var args = [req,res].concat(captures.splice(1));
          fn.apply(null,args);
          return;
        }
    }
    next();
  }
}