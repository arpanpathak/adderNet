/*
 * Helper for various tasks
 *
 */

//Dependencies
const https= require('https');
const querystring = require('querystring');
const crypto = require('crypto');
const config = require('../config/keys');

//Container for all helpers
var helpers = {};

// Random number in range
helpers.random = (min, max)=> Math.random() * (max - min) + min;

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

//Send an SMS message via Twilio
helpers.sendTwilioSms = function(phone, msg, callback){
  //Validate parameters
  phone = typeof(phone) == 'string' && phone.trim().length == 13 ? phone.trim() : false;
  msg = typeof(msg) == 'string' && msg.trim().length > 0 && msg.trim().length < 1600 ? msg :false;
  if(phone && msg){
    //configure the payload
    var payload = {
      'From' : config.twilio.fromPhone,
      'To' : phone,
      'Body' : msg
    };

    var stringPayload = querystring.stringify(payload);

    //configure request details
    var requestDetails = {
        'protocol' : 'https:',
        'hostname' : 'api.twilio.com',
        'method' : 'POST',
        'path' : '/2010-04-01/Accounts/'+config.twilio.accountSid+'/Messages.json',
        'auth' : config.twilio.accountSid+':'+config.twilio.authToken,
        'headers' : {
          'Content-Type' : 'application/x-www-form-urlencoded',
          'Content-Length': Buffer.byteLength(stringPayload)
        }
      };

    //Instanciate request Object
    var req = https.request(requestDetails, function(res){
      //Grab the status of the sent request
      var status = res.statusCode;
      //Callback successfully if the request went through
      if(status == 200 || status == 201){
        callback(false);
      }else{
        callback(status);
      }
    });

    //Bind to error event, so that it is not thrown
    req.on('error',(e)=>{
      callback(e);
    });

    //Add payload
    req.write(stringPayload);

    //End the request
    req.end();

  }else{
    callback("parameters miss-match");
  }
};

//Create a random string
helpers.RandomStringGenerate = function(strLength){
  strLength = typeof(strLength) == 'number' && strLength > 0 ? strLength : false;
  if(strLength){

    //Define all possible characters
    var chars = "1234567890";

    //Start final string
    var str = "";

    for(i=0; i<strLength; i++){
      //Random chars from possible chars
      str += chars.charAt(Math.floor(Math.random() * (chars.length)));
    }

    //Return final string
    return str;
  }
  else{
    return false;
  }
};

//exports
module.exports = helpers;
