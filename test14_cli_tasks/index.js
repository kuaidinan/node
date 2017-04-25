var fs = require('fs');
var path = require('path');
var args = process.argv.splice(2);
var command = args.shift();
var taskDescription = args.join(' ');
var file = path.join(process.cwd(),'/.tasks');

switch (command) {
  case 'list':
    listTasks(file);
    break;
  case 'add':
    addTask(file,taskDescription);
    break;
  default:
    console.log(`Usage: ${process.argv[0]} list|add [taskDescription]`);
}

function loadOrIntializeTasksArray(file,cb){
  fs.exists(file, function(exists){
    var tasks = [];
    if(exists){
      fs.readFile(file,function(err,data){
        if(err) throw err;
        var data = data.toString();
        tasks = JSON.parse(data || '[]');
        cb(tasks);
      })
    }else{
      cb([]);
    }
  })
}

function listTasks(){
  loadOrIntializeTasksArray(file,function(file){
    for(var index in file){
      console.log(file[index]);
    }
  })
}

function storeTask(file,tasks) {
  fs.writeFile(file,JSON.stringify(tasks),'utf8',function(err){
    if(err) throw err;
    console.log('Saved.');
  })
}

function addTask(file,taskDescription){
  loadOrIntializeTasksArray(file,function(tasks){
        console.log(tasks);
    tasks.push(taskDescription);
    storeTask(file,tasks);
  })
}