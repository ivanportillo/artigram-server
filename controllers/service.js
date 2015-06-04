//SERVICE.JS
var jwt = require('jwt-simple'),
    moment = require('moment'),
    config = require('./../config');

exports.createToken = function(user){
  var payload = {
    sub: user,
    iat: moment().unix(),
    exp: moment().add(14, "days").unix()
  };

  return jwt.encode(payload, config.TOKEN_SECRET);
};
