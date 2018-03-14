const passport = require('passport');
const localStrategy = require('passport-local');
var User = require('../models/user-model');

passport.serializeUser((user,done)=>{
  done(null, user.id);
});

passport.deserializeUser((user,done)=>{
  User.findById(user).then((user)=>{
    done(null, user);
  });
});

passport.use(new localStrategy({
  usernameField: 'username',
  passwordField: 'password'
},(username, password, done)=>{
  User.findOne({username:username}).then((currentUser)=>{
      if(currentUser){
        if(currentUser.username == username && currentUser.password == password){
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
