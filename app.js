var exec = require('child_process').exec,
    bodyParser      = require("body-parser"),
    methodOverride  = require("method-override"),
    mongoose        = require('mongoose'),
    colors          = require('colors'),
    http = require('http'),
    express = require('express');


var home = process.env.HOME,
    command = "cd " + home + "/tg/ && bin/telegram-cli -vvvvRC -k tg-server.pub -W -dL tg.log -P 1234 -l 1 -E",
    app = express(),
    port = 8080;

console.log("-----------------------------------------");
console.log("|           " + "ARTIGRAM-SERVER".bold.yellow + "             |");
console.log("-----------------------------------------");

// MIDDLEWARES
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

// EJECUCION PROCESO
var child = exec(command, function(){
    console.log("TELEGRAM PROCESS (PID " + child.pid + ") - " + "OK".green);
});

//CONTROL SALIDA
process.on('exit', function(){
    console.log("EXIT NODE");
});

process.on('uncaughtException', function(err){
    console.log("uncaughtException: ".bold.red + err);
});

//CONEXION TELNET
if(child){
  var telnetCon = require('./telnet');
}

var models = require('./models/user')(app, mongoose),
    usersCtlr = require('./controllers/users'),
    notificationsCtlr = require('./controllers/notifications'),
    authCtrl = require('./controllers/auth'),
    tokens = require('./middlewares/tokens');

//EXPRESS
var router = express.Router();

router.route('/login')
      .post(authCtrl.login);

router.route('/users')
      .get(tokens.ensureAuthenticated, usersCtlr.findAllUsers)
      .post(tokens.ensureAuthenticated, function(req, res){
        usersCtlr.addUser(req,res,telnetCon);
      });

router.route('/users/:id')
      .get(tokens.ensureAuthenticated, usersCtlr.findByID)
      .post(tokens.ensureAuthenticated, usersCtlr.updateUser)
      .delete(tokens.ensureAuthenticated, usersCtlr.deleteUser);

router.route('/notifications')
      .post(tokens.ensureAuthenticated, function(req, res){
        notificationsCtlr.sendNotification(req,res,telnetCon);
      });

app.use(router);

//DATABASE
mongoose.connect('mongodb://localhost/users', function(err, res) {
    if(err) throw err;
    console.log("CONNECTION TO DATABASE - " + "OK".green);
    app.listen(port, function(){
      console.log("EXPRESS SERVER (PORT " + port + ") - " + "OK".green);
    });
});
