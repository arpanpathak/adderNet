const passport = require('passport'),
      localStrategy = require('passport-local'),
      GoogleStrategy = require('passport-google-oauth20').Strategy;
var User = require('../models/User');

passport.serializeUser((user,done)=>{
  done(null, user.id);
});

passport.deserializeUser((user,done)=>{
  User.findById(user).then((user)=>{
    done(null, user);
  });
});

 //Authentication Strategies....
/** different kinds of authentication that adderNet using are here **/

// authentication using email and password...
passport.use('email-local',new localStrategy({
  usernameField: 'email',
  passwordField: 'password'
},(email, password, done)=>{
  User.findOne({ email : email}).then((currentUser)=>{
      if(currentUser){
        if(currentUser.email == email && currentUser.password == password){
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

// authentication using phone and password...
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

// authentication using google account..
// passport.use(new GoogleStrategy());



module.exports = passport;