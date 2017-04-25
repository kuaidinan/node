var fs = require('fs');
var path = require('path');
var args = process.argv.splice(2);
var command = args.shift();
var taskDescription = args.join(' ');
var file = path.join(process.cwd(),'/.tasks');
// 确定cli脚本应该采取什么动作
switch(command){
  case 'list':
    listTasks(file);
    break;
  case 'add':
    addTask(file, taskDescription);
    break;
  default:
    console.log(`Usage:${process.argv[0]}list|add [taskDescription]`);
}

// 获取任务的辅助函数
function loadOrInitializeTaskArray(file, cb){
  fs.exists(file, function(exists){
    var tasks = [];
    if (exists) {
      fs.readFile(file, 'utf8', function(err, data){
        if (err) throw err;
        var data = data.toString();
        var tasks =JSON.parse(data || '[]');
        cb(tasks);
      });
    } else {
      cb([]);
    }
  });
}
// 列出任务的函数
function listTasks(file) {
  loadOrInitializeTaskArray(file, function(tasks) {
    for (var i in tasks) {
      console.log(tasks[i]);
    }
  });
}

// 存放任务的函数
function storeTasks(file, tasks) {
  fs.writeFile(file, JSON.stringify(tasks),'utf8',function(err){
    if (err) throw err;
    console.log('Saved.');
  })
}

// 添加一项任务
function addTask(file, taskDescription) {
  loadOrInitializeTaskArray(file, function(tasks){
    tasks.push(taskDescription);
    storeTasks(file, tasks);
  })
}