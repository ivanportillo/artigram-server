var telnet = require('net'),
    // http = require('http'),
    // express = require('express'),
    // app = express(),
    exec = require('child_process').exec,
    home = process.env.HOME,
    user = process.env.USER,
    command = "cd " + home + "/tg/ && bin/telegram-cli -vvvvRC -k tg-server.pub -W -dL tg.log -P 1234",
    child = exec(command);

child.stdout.on('data', function(data) {
    console.log('stdout: ' + data);
});

console.log("Telegram process initiated with PID " + child.pid)

process.on('exit', function(){
  console.log("EXIT NODE");
});

process.on('SIGINT', function(){
  console.log("CTRL+C Pressed");

});

process.on('uncaughtException', function(){
  console.log("uncaughtException");
});

var ip = '127.0.0.1';
var port = 1234;

var client = net.connect(port, ip, function(){
	//client.write("msg ASL holiii");
	client.on('data', function(data){
		console.log("CONECTADITO");
	});
});
