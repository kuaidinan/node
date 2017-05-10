var express = require('express');
var router = express.Router();
router.get('/', function (req, res, next) {
  res.render('list', { test: '111' });
});

module.exports = router;