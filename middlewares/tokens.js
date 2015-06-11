// tokens.js
var jwt = require('jwt-simple');
var moment = require('moment');
var config = require('./../config');

exports.ensureAuthenticatedAdmin = function(req, res, next) {
  if(!req.headers.authorization) {
    return res
      .status(403)
      .send({message: "Autorizacion necesaria"});
  }

  var token = req.headers.authorization;
  var payload = jwt.decode(token, config.TOKEN_SECRET);

  if(payload.exp <= moment().unix()) {
     return res
        .status(401)
        .send({message: "El token ha expirado"});
  }

  req.user = payload.sub;
  if(req.user == "admin"){
    next();
  }
  else{
    return res.status(403).send({ message: "Tu usuario no tiene suficientes permisos."});
  }
};

exports.ensureAuthenticatedUser = function(req, res, next) {
  if(!req.headers.authorization) {
    return res
      .status(403)
      .send({message: "Autorizacion necesaria"});
  }

  var token = req.headers.authorization;
  var payload = jwt.decode(token, config.TOKEN_SECRET);

  if(payload.exp <= moment().unix()) {
     return res
        .status(401)
        .send({message: "El token ha expirado"});
  }

  req.user = payload.sub;
  next();
};
