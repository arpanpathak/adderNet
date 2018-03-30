const passport = require('passport');
const localStrategy = require('passport-local');
const helpers = require('../lib/helpers');
var User = require('../models/User');

passport.serializeUser((user,done)=>{
  done(null, user.id);
});

passport.deserializeUser((user,done)=>{
  User.findById(user).then((user)=>{
    done(null, user);
  });
});

passport.use('email-local',new localStrategy({
  usernameField: 'email',
  passwordField: 'password'
},(email, password, done)=>{
  User.findOne({ email : email}).then((currentUser)=>{
      if(currentUser){
        if(currentUser.email == email && currentUser.password == helpers.hash(password)){
          done(null, currentUser);
        }
        else{
          done(null, false);
        }
      }
      else{
        done(null, false);
      }
  });
}));

passport.use('phone-local',new localStrategy({
  usernameField: 'phone',
  passwordField: 'password'
},(email, password, done)=>{
  User.findOne({ phone : phone}).then((currentUser)=>{
      if(currentUser){
        if(currentUser.phone == phone && currentUser.password == password){
          done(null, currentUser);
        }
        else{
          done(null, false);
        }
      }
      else{
        done(null, false);
      }
  });
}));

module.exports = passport;
