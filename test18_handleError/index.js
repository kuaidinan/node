var connect = require('connect');

function errorHandler() {
  var env = process.env.NODE_ENV || 'development';
  return function (err, req, res, next) {
    res.statusCode = 500;
    switch (env) {
      case 'development':
        res.setHeader('Content-Type','text/plain');
        res.end(err.toString());
        console.log(err);
        console.log(Buffer.byteLength(err));
        res.end(JSON.stringify(err));
        break;
      default:
        res.end('Server error');
    }
  }
}
connect().use(function () {
  foo();
  res.setHeader('Content-Type', 'text/plain');
  res.end('hello world');
}).use(errorHandler())
  .listen(3000);