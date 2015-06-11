var service = require('./service');

exports.login = function(req, res){
    if(req.body.user == "admin"){ //SUPERADMIN
      if(req.body.pass == "admin"){
        return res.status(200).send({token: service.createToken(req.body.user)});
      }
      else{
        return res.status(400).send({message:"Incorrect user or password"});
      }
    }
    else if(req.body.user == "client"){ //CLIENT
      if(req.body.pass == "client"){
        return res.status(200).send({token: service.createToken(req.body.user)});
      }
      else{
        return res.status(400).send({message:"Incorrect user or password"});
      }
    }
    else{ //USER DON'T EXIST
    return res.status(400).send({message:"Incorrect user or password"});
    }
};
