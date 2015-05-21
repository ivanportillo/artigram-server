var exec = require('child_process').exec,
    home = process.env.HOME,
    command = "cd " + home + "/tg/ && bin/telegram-cli -vvvvRC -k tg-server.pub -W -dL tg.log -P 1234 -l 1 -E",
    http = require('http'),
    express = require('express'),
    bodyParser      = require("body-parser"),
    methodOverride  = require("method-override"),
    mongoose        = require('mongoose'),
    app = express(),
    child,
    dirname = __dirname;

// MIDDLEWARES
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

// EJECUCION PROCESO
child = exec(command, function(){
    console.log("Telegram process initiated with PID " + child.pid);
});

child.stdout.on('data', function(data) {
    console.log('stdout: ' + data);
});

//CONTROL SALIDA
process.on('exit', function(){
    console.log("EXIT NODE");
});

process.on('uncaughtException', function(){
    console.log("uncaughtException");
});

//CONEXION TELNET
var telnetCon = require('./telnet');



//DATABASE
mongoose.connect('mongodb://localhost/users', function(err, res) {
    if(err) throw err;
    console.log('Connected to Database');
});

var models = require('./models/user')(app, mongoose),
    usersCtlr = require('./controllers/users'),
    notificationsCtlr = require('./controllers/notifications');

//EXPRESS
var router = express.Router();

router.route('/users')
      .get(usersCtlr.findAllUsers)
      .post(function(req, res){
        usersCtlr.addUser(req,res,telnetCon);
      });

router.route('/users/:id')
      .get(usersCtlr.findByID)
      .post(usersCtlr.updateUser)
      .delete(usersCtlr.deleteUser);

router.route('/notifications')
      .post(function(req, res){
        notificationsCtlr.sendNotification(req,res,telnetCon, dirname);
      });

app.use(router);

app.listen(8080, function(){
  console.log("Express server listening in port 8080");
});
