var exec = require('child_process').exec,
    home = process.env.HOME,
    user = process.env.USER,
    command = "cd " + home + "/tg/ && bin/telegram-cli -vvvvRC -k tg-server.pub -W -dL tg.log -P 1234 -l 1 -E",
    child = exec(command),
    connected = false,
    http = require('http'),
    express = require('express'),
    app = express(),
    bool;

child.stdout.on('data', function(data) {
    console.log('stdout: ' + data);
});

console.log("Telegram process initiated with PID " + child.pid)

process.on('exit', function(){
  console.log("EXIT NODE");
});

process.on('uncaughtException', function(){
  console.log("uncaughtException");
});

var net = require('net');
var conn = net.createConnection(1234,'127.0.0.1');


function sendData(socket, data) {
    socket.write(data + "\n");
}

conn.on('connect', function(){
  console.log("Connected to telnet server.");
});

conn.on('data', function(data){
  console.log(data.toString());
});

conn.on('close', function(){
  conn.end();
});

app.get('/', function(req, res){
    sendData(conn, "msg ASL testNODE2");
    conn.end();
    res.send("Message sent!");
});

app.listen(8080);
