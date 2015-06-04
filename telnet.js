var net = require('net');
var conn = net.createConnection(1234,'127.0.0.1');
var colors = require('colors');

conn.on('connect', function(){
  console.log("TELNET CONNECTION WITH TELEGRAM - " + "OK".green);
});

conn.on('data', function(data){
  var formatted = data.toString();
  if(formatted.indexOf("8") > -1){ //MESSAGE SENT (ANSWER 8)
    console.log("TELNET CONNECTION:".blue.bold + " message sent");
  }
  else if(formatted.indexOf("12") > -1){ //CONTACT SAVED (ANSWER 12)
    console.log("TELNET CONNECTION:".blue.bold + " contact saved");
  }
  else if(formatted.indexOf("16") > -1){ //CONTACT ALREADY EXISTS (ANSWER 16)
    console.log("TELNET CONNECTION:".blue.bold + " contact already exists.");
  }
});

conn.on('close', function(){
  conn.end();
  console.log("TELNET CONNECTION:".blue.bold + " connection closed");
});

module.exports = conn;
