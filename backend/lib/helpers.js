/*
 * Helper for various tasks
 *
 */

//Dependencies
const crypto = require('crypto');
const config = require('../config/keys');

//Container for all helpers
var helpers = {};

//create SHA256 hash
helpers.hash = function(password){
  if(typeof(password) == 'string' && password.length > 7){
    var initialHash = crypto.createHmac('sha256', config.hashSecret1).update(password).digest('hex');
    initialHash += config.salt.key;
    var hash = crypto.createHmac('sha256', config.hashSecret2).update(initialHash).digest('hex');
    return hash;
  }
  else{
    return false;
  }
};

//exports
module.exports = helpers;
