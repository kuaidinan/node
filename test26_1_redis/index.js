var redis = require('redis'),
    RDS_PORT = 6379,
    RDS_HOST = '127.0.1.1',
    RDS_PWD = 'hello',
    RDS_OPS = {};
    client = redis.createClient(RDS_PORT,RDS_HOST,RDS_OPS);

client.auth(RDS_PWD,function(){
  console.log('通过认证');
});

// 设置单个key
// client.on('connect',function(){
//   client.set('author','xq',redis.print);
//   client.get('author',redis.print);
//   console.log('connect');
// })
// 设置多个值
// client.on('connect', function(){
//   client.hmset('short',{'js':'jaascript','c#':'c Sharp'}, redis.print);
//   client.hmset('short','SQL','Structured Query Language','HTML','HyperText',redis.print);

//   client.hgetall('short',function(err,res){
//     if(err)
//     {
//       consle.log('Error' + err);
//       return;
//     }
//     console.dir(res);
//   })
// })

// client.on('ready',function(){
//   console.log('ready');
// });

client.on('end',function(err){
  console.log('end');
})

client.on('connect',function(){
  var key = 'skills';
    client.sadd(key,'c#','java',redis.print);
    client.sadd(key,'nodejs');
    client.sadd(key,'MySQL');

    client.multi()
      .sismember(key,'C#')
      .smembers(key)
      .exec(function(err,replies){
        console.log('MULTI got' + replies.length + "replies");
        replies.forEach(function(reply,index){
          console.log("Reply" + index + ":" + reply.toString());
        });
        client.quit();
      })
})