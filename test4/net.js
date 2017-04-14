var events = require('events');
var net = require('net');

var channel = new events.EventEmitter();

channel.clients = {};
channel.subsciptions = {};

channel.on('join', function(id, client){
  var welcome = "Welcome!\n"
  + "Guests online:" + this.listeners('broadcast').length;
  client.write(welcome + "\n");
  this.clients[id] = client;
  this.subsciptions[id] = function(senderId, message){
    if (id != senderId) {
      this.clients[id].write(message);
    }
  }
  this.on('broadcast', this.subsciptions[id]);
});

channel.on('leave',function(id){
  channel.removeListener('broadcast',this.subsciptions[id]);
  channel.emit('broadcast', id, id+ "has leave.\n");
});

channel.on('shutdown', function(){
  channel.emit('broadcast','',"Chat has shut down.\n");
  channel.removeAllListeners('broadcast');
})

var server = net.createServer(function(client){
  var id = client.remoteAddress + ':' + client.remotePort;
  channel.emit('join', id, client);
  client.on('data', function(data){
    data = data.toString();
    if(data == "s"){
      channel.emit('shutdown');
    }
    channel.emit('broadcast', id , data);
  });

  client.on('close', function(){
    channel.emit('leave',id);
  });
});
server.listen(8888);