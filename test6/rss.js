var fs = require('fs');
var request = require('request');
var htmlparser = require('htmlparser');
var configFilename = 'rss_feeds.txt';

// 检测rss文件是否有内容 有则进行下一个任务 无则抛出错误并中断流程
function checkForRSSFile(){
  fs.exists(configFilename,function(exists){
    if(!exists)
      return next(new Error('Missing rss file' + configFilename));
    next(null,configFilename);
  })
}
// 读取一个RSS地址（随机）并往下传递执行
function readRSSFile(file){
  fs.readFile(file,function(err,feedlist){
    if(err) throw err;
    feedlist = feedlist.toString().replace(/^\s+|s+$/g,'').split('\n');
    var random = parseInt(Math.random()*feedlist.length);
    next(null,feedlist[random]);
  })
}
// 访问一个RSS 并把body传递下去
function downloadRSS(feedurl){
  request({uri:feedurl},function(err,res,body){
    if(err) throw err;
    if(res.statusCode != 200)
      return next(new Error('Abnormal response status code'))
    next(null,body)
  })
}

// 通过第三方组件htmlparser 将得到的数据进行处理
function parseRSSFeed(rss){
  var handler = new htmlparser.RssHandler();
  var parser = new htmlparser.Parser(handler);
  parser.parseComplete(rss);
  if (!handler.dom.items.length)
    return next(new Error('No RSS items found'));
  var item = handler.dom.items.shift();
}

var task = [
  checkForRSSFile,
  readRSSFile,
  downloadRSS,
  parseRSSFeed
]

function next(err,result){
  if(err) throw err;
  var currentTask = task.shift();
  if(currentTask){
    currentTask(result);
  }
}

next();