function setup(format) {
  var regExp = /:(\w+)/g;
  return function logger(req, res, next) {
    var str = format.replace(regExp, function (match, property) {
      return req[property];
    })
    console.log(str);
    next();
  }
};

module.exports = setup;