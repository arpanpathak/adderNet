// importing Strategies, keys, helpers and models..
const passport = require('passport'),
      localStrategy = require('passport-local'),
      GoogleStrategy = require('passport-google-oauth20').Strategy,
      FacebookStrategy = require('passport-facebook').Strategy,
      keys = require('./keys'),
      helpers = require('../lib/helpers'),
      mongoose = require('mongoose')
     ,User=mongoose.model('user');
     
passport.serializeUser((user,done)=>{
  done(null, user._id);
});

passport.deserializeUser((user,done)=>{
  User.findById(user).then((user)=>{
    // only store user id, name and email 
    done(null, { _id: user._id, name: user.name, email: user.email,coverPic: user.coverPic,profilePic: user.profilePic });
  });
});

 //Authentication Strategies....
/** different kinds of authentication that adderNet using are here **/

// authentication using email and password...
passport.use('email-local',new localStrategy({
    usernameField: 'userid',
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
  usernameField: 'userid',
  passwordField: 'password'
},(phone, password, done)=>{
  User.findOne({ phone : phone}).then((currentUser)=>{
      if(currentUser){
        if(currentUser.phone == phone && currentUser.password == helpers.hash(password) ){
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

// authentication using google account.. If account doesn't exist then create a new one..
passport.use(new GoogleStrategy(
   { clientID: keys.api.googleOAuth.client_id,
    clientSecret: keys.api.googleOAuth.client_secret,
    callbackURL: '/auth/google/callback'

   },(accessToken, refreshToken, profile, done) => { 
        console.log('Google OAuth accessToken ',accessToken);
        console.log('Google OAuth refreshToken',refreshToken );  
        console.log('User info got:- ',profile);
        console.log(profile.emails[0].value);
        User.findOne({$or:[ {'googleId': profile.id} ,{'email': profile.emails[0].value}] },
          (err,user)=>{
          console.log('user is',user);
          if(user) {
            console.log('user already created ',user);
            done(null,user)
          }else{
            new User({googleId: profile.id,date_created: Date.now(), name: profile.displayName,
                      email: profile.emails[0].value })
                .save((newUser)=>{
                    console.log('user was not previously created.Now it is added');
                    done(null,newUser);
                });
           
          }
        });  

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
