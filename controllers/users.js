var mongoose = require('mongoose'),
    User = mongoose.model('User');

var addContact = function(firstName, lastName, phone, socket){
  socket.write("add_contact " + phone + " " + firstName + " " + lastName + "\n");
}

exports.findAllUsers = function(req, res){
    User.find(function(err, users){
      if(err){
        return res.send(500, err.message);
      }
      console.log("GET /users");
      res.status(200).jsonp(users);
    });
};

exports.findByID = function(req, res){
    User.findById(req.params.id, function(err, user){
        if(err){
          return res.send(500, err.message);
        }
        console.log("GET /users/"+ req.params.id);
        res.status(200).jsonp(user);
    });
};

exports.addUser = function(req, res, socket){
    console.log("POST");

    var user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        groups: req.body.groups
    });
    addContact(req.body.firstName, req.body.lastName, req.body.phoneNumber, socket);
    user.save(function(err, user){
        if(err){
          return res.send(500, err.message);
        }
        res.status(200).send("User " + req.body.firstName + " " + req.body.lastName + " added!");
    });
};

exports.updateUser = function(req, res){
  User.findById(req.params.id, function(err, user){
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.groups = req.body.groups;

    user.save(function(err){
        if(err){
          return res.send(500, err.message);
        }
        res.status(200).jsonp(user);
    });
  })
};

exports.deleteUser = function(req, res){
    User.findById(req.params.id, function(err, user){
        user.remove(function(err){
            if(err){
              return res.send(500, err.message);
            }
            res.status(200).send(req.params.id + " User deleted!");
        });
    });
};
