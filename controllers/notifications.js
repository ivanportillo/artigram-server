var mongoose = require('mongoose'),
    User = mongoose.model('User');
    // fs = require('fs');
    // request = require('request');

var sendMessage =  function (message, user, socket) {
  socket.write("msg " + user + " " + message + "\n");
}

// var sendImage = function(imageURL, user, socket){
//   socket.write("send_photo " + user + " " + imageURL + "\n");
// }

// var download = function(uri, filename, callback){
//   request.head(uri, function(err, res, body){
//     console.log('content-type:', res.headers['content-type']);
//     console.log('content-length:', res.headers['content-length']);
//
//     request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
//   });
// };

function isPartOfGroup(group, user){
  for(var i=0, arrayLength = user.groups.length; i<arrayLength; i++){
    if(user.groups[i] == group){
      return true;
    }
  }
  return false;
}

exports.sendNotification = function(req, res, socket, dirname){
  var image = false;
  User.find(function(err, users){
    if(err){
      return res.send(500, err.message);
    }
    console.log("NOTIFICATION BODY: ".bold + req.body.message);
    // if(req.body.image !== undefined){
    //   var imgName = "test.png";
    //   var dir = dirname +  "/images/" + imgName;
    //   download(req.body.image, "images/" + imgName , function(){
    //     image = true;
    //   });
    // }
    for(var i=0, arrayLength = users.length; i<arrayLength; i++){
      if(isPartOfGroup(req.body.group, users[i])){
        var user = users[i].firstName+'_'+users[i].lastName;
        console.log("Sending notification to " + user.green);
        sendMessage(req.body.message, user, socket);
        // if(image){
        //   console.log(dir);
        //   sendImage(dir, user, socket);
        // }
      }
    }

    res.send("Notification sent");
  });
}
