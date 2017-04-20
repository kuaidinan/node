var fs = require('fs');
var fileDir = './text';
var tasks = [];
var wordsCount= {};
var completedTask = 0;

// 对一个text文字进行分类、计数
function countWords(text){
  var words = text.toString().toLowerCase().split(/\W+/).sort();
  for(var index in words){
    var word = words[index];
    if(word){
      wordsCount[word] = (wordsCount[word])?wordsCount[word]+1:1;
    }
  }
}

// 所有任务都完成后 列出统计结果
function checkIfComplete(){
  completedTask++;
  if(completedTask == tasks.length){
    for(var index in wordsCount){
      console.log(index+':'+wordsCount[index])
    }
  }
}

fs.readdir(fileDir,function(err,files){
    if(err) throw err;
    for(var index in files){
      var task=(function(file){
        // 定义异步读取文件函数 对每个文件进行处理
        return function(){
          fs.readFile(file,function(err,text){
            if(err) throw err;
            countWords(text);
            checkIfComplete();
          })
        }
      })(fileDir+'/'+files[index]);
      tasks.push(task);
    }
    console.log(tasks);
    for(var task in tasks){
      tasks[task]();
    }
});