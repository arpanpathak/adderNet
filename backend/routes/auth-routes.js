//Requires
const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const User = require('../models/user-model');
const router = express.Router();
const jsonParser = bodyParser.json();

//Functions
const addUser = (req, res, next) => {
  new User({
    name: req.body.name,
    username: req.body.username,
    password: req.body.password
  }).save((newUser)=>{
    next();
  });
}

//static files
router.use('/public',express.static('public'));

//Get & Post requests
router.post('/login', jsonParser, passport.authenticate('local', {failureRedirect: '/'}), (req,res)=>{
  res.send('success');
});

router.post('/create', jsonParser, addUser, passport.authenticate('local', {failureRedirect: '/'}), (req,res)=>{
  res.send('success');
});

router.get('/logout',(req,res)=>{
  req.logout();
  res.redirect('/');
});

module.exports = router;
