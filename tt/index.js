var connect = require('connect');
var router = require('./middle/router.js');
var routes = {
  GET: {
    '/users': function (req, res) {
      res.end('xq xq xq');
    },
    '/user/:id': function (req, res, id) {
      res.end(`user${id}`)
    }
  },
  DELETE: {
    '/user/:id': function (req, res, id) {
      res.end(`delete user ${id}`);
    }
  }
};
connect()
  .use(router(routes))
  .listen(1111);

