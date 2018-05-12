/*
 * Helper for various tasks
 *
 */

//Dependencies
const https= require('https');
const querystring = require('querystring');
const crypto = require('crypto');
const config = require('../config/keys');
const User = require('../models/User');
var prettyHtml = require('json-pretty-html').default;


//Container for all helpers
var helpers = {};

// Random number in range
helpers.random = (min, max)=> Math.random() * (max - min) + min;

//create SHA256 hash
helpers.hash = (password)=>{
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
helpers.sendTwilioSms = (phone, msg, callback)=>{
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
helpers.RandomStringGenerate = (strLength)=>{
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

//Sanitizing
helpers.sanitize = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png|gif/;
  const extname = fileTypes.test(path.extname(file.originalname));
  const mimetype = fileTypes.test(file.mimetype);
  if(mimetype && extname){
    return cb(null, true);
  }
  else{
    cb('Error: Images Only!!');
  }
};

//Search Friend
helpers.searchFriend = function(name, callback){
  User.find({$or:[{name: new RegExp(name, "i")},{username: new RegExp(name, "i")},{email: new RegExp(name, "i")}]},null,{sort:'id'}).select('name').select('username').then((data)=>{
        callback(false, data);
  },(err)=>{
    callback(err);
  });
};

// inline styling for JSON.. 
const style="<style> body{font-family:Menlo,Monaco,Courier New,monospace;font-weight:400;font-size:14px;line-height:16px;letter-spacing:0;background-color:#24282A;color:#d4d4d4;text-align:left;border-top:1px solid #121516;padding-top:10px;padding-bottom:10px;margin:0}.json-pretty{padding-left:30px;padding-right:30px}.json-selected{background-color:rgba(139,191,228,.19999999999999996)}.json-string{color:#6caedd}.json-key{color:#ec5f67}.json-boolean,.json-number{color:#99c794}</style>";
  // beautify json response..
helpers.json_to_html=(json) => "<!DOCTYLE html><html><body>"+style+prettyHtml(json)+"</body></html>"; 

//exports
module.exports = helpers;

