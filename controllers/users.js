var mongoose = require('mongoose'),
    User = mongoose.model('User');

var addContact = function(firstName, lastName, phone, socket){
  socket.write("add_contact " + phone + " " + firstName + " " + lastName + "\n");
}

var modifyContact = function(phone, firstName, lastName, socket){
  socket.write("rename_contact " + phone + " " + firstName + " " + lastName + "\n");
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
    if(!req.params.id){
      return res.status(400).send({message: "You must indicate a ID."});
    }
    User.findById(req.params.id, function(err, user){
        if(err){
          return res.send(500, err.message);
        }
        console.log("GET /users/"+ req.params.id);
        return res.status(200).jsonp(user);
    });
};

exports.addUser = function(req, res, socket){
    if(!req.body.firstName || !req.body.lastName || !req.body.groups){
      return res.status(400).send({message: "FirstName, LastName and Groups fields is required."});
    }
    var user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        groups: req.body.groups
    });
    console.log("New user:" + user.firstName + " " user.lastName);
    User.find({firstName: user.firstName, lastName: user.lastName}, function(err, docs){
      if(docs.length){ //EXISTS
        return res.status(422).send({message: "User already exists."});
      }
      else{
        addContact(user.firstName, user.lastName, req.body.phoneNumber, socket);
        user.save(function(err, user){
            if(err){
              return res.send(500, err.message);
            }
            res.status(200).send("User " + user.firstName + " " + user.lastName + " added!");
        });
      }
    });
};

exports.updateUser = function(req, res){
  if(!req.body.firstName || !req.body.lastName || !req.body.groups){
    return res.status(400).send({message: "FirstName, LastName and Groups fields is required."});
  }
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
  if(!req.params.id){
    return res.status(400).send({message: "You must indicate a ID."});
  }
  User.findById(req.params.id, function(err, user){
      user.remove(function(err){
          if(err){
            return res.send(500, err.message);
          }
          res.status(200).send(req.params.id + " User deleted!");
      });
  });
};
