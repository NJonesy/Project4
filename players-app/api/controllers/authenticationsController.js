var passport = require("passport");
var Player   = require('../models/player');
var secret   = require('../config/config').secret 
var jwt      = require('jsonwebtoken');

function register(req, res, next) {
  var localStrategy = passport.authenticate('local-sign-up', function(err, player, info) {
    if (err) return res.status(500).json({ message: 'Something went wrong!' });
    if (info) return res.status(401).json({ message: info.message });
    if (!player) return res.status(401).json({ message: 'Player already exists!' });

    // Player has authenticated so issue token
    var token = jwt.sign(player, secret, { expiresIn: 60*60*24 });
    
    // Sending back the token to the front-end to store
    return res.status(200).json({
      success: true,
      message: "Thank you for authenticating",
      token: token,
      player: player
    });
  });  

  return localStrategy(req, res, next);
};

function login(req, res, next) {
  Player.findOne({ "email": req.body.email }, function(err, player) {
    console.log('banana')
    if (err) return res.status(500).json(err);
    if (!player) return res.status(403).json({ message: 'No player found.' });
    if (!player.validPassword(req.body.password)) return res.status(403).json({ message: 'Authentication failed.' });

    var token = jwt.sign(player, secret, { expiresIn: 60*60*24 });
    
    return res.status(200).json({
      success: true,
      message: 'Welcome!',
      token: token,
      player: player
    });
  });
};

module.exports = {
  login: login,
  register: register
}



