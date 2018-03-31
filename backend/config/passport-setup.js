const passport = require('passport'),
      localStrategy = require('passport-local'),
      GoogleStrategy = require('passport-google-oauth20').Strategy,
      FacebookStrategy = require('passport-facebook').Strategy,
      keys = require('./keys');
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

 //Authentication Strategies....
/** different kinds of authentication that adderNet using are here **/

// authentication using email and password...
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
passport.use(new GoogleStrategy(
                 { clientID: keys.api.googleOAuth.client_id,
                  clientSecret: keys.api.googleOAuth.client_secret,
                  callbackURL: '/auth/google/callback'

                 },(accessToken, refreshToken, profile, done) => { 
                      console.log('Google OAuth accessToken ',accessToken);
                      console.log('Google OAuth refreshToken',refreshToken );  
                      console.log('User info got:- ',profile);  
                      return done(null,profile);
                  }
                ) 
             );


// authentication using facebook account.. it won't work without https..
passport.use(new FacebookStrategy({
    clientID: keys.api.fbOAuth.client_id,
    clientSecret: keys.api.fbOAuth.client_secret,
    callbackURL: "/auth/facebook/callback"
  },
  function(accessToken, refreshToken, user, done) {
    // User.findOrCreate({ facebookId: profile.id }, function (err, user) {
    //   return cb(err, user);
    // });
    done(null,user)
  }
));

module.exports = passport;
