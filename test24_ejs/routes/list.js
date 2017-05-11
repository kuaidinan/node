let show = [];
show.push({
  url:'http://ocjvsx2zd.bkt.clouddn.com/o-b-6406.jpg',
  name:'第八号当铺'
});
show.push({
  url:'http://ocjvsx2zd.bkt.clouddn.com/o-b-6337.jpg',
  name:'2017周杰伦地表最强演唱会'
})

var express = require('express');
var router = express.Router();
router.get('/', function (req, res, next) {
  res.render('list', { test: '111' ,show:show});
});

module.exports = router;