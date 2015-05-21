var net = require('net');
var conn = net.createConnection(1234,'127.0.0.1');

conn.on('connect', function(){
  console.log("Connected to telnet server.");
});

conn.on('data', function(data){
  console.log(data.toString());
});

conn.on('close', function(){
  conn.end();
});

module.exports = conn;
