var events = require('events');
var net = require('net');

var channel = new events.EventEmitter();
channel.clients ={};
channel.subscriptions = {};

channel.on('join', function(id, client){
  var welcome = "welcome!\n"
  + "Guests online:" + this.listeners('broadcast').length;
  client.write(welcome + '\n');
  this.clients[id] = client;
  this.subscriptions[id] = function (senderid ,message){
    if (id != senderid) {
      this.clients[id].write(message);
    }
  }
  this.on('broadcast', this.subscriptions[id]);
})
// 离开做的事情 do when user leave
channel.on('leave',function(id){
  channel.removeListener('broadcast',this.subscriptions[id]);
  channel.emit('broadcast',id ,id +'has leave the chat\n');
})

channel.on('shutdown',function(){
  channel.emit('broadcast','','chat has shut down.\n');
  channel.removeAllListeners('broadcast');
})

var server = net.createServer(function (client) {
  var id = client.remoteAddress + ':' + client.remotePort;
  channel.emit('join', id, client);
  client.on('data', function(data){
    data = data.toString();
    if(data == "s"){
      channel.emit('shutdown');
    }
    channel.emit('broadcast',id,data);
  })
  client.on('close', function(){
    channel.emit('leave',id);
  })
})
server.listen(8888);