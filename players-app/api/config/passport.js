var LocalStrategy = require("passport-local").Strategy;
var Player        = require("../models/player");

module.exports = function(passport) {

  passport.use('local-sign-up', new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true,
  }, function(req, email, password, done) {

      // Find a player with this email
    Player.findOne({ 'local.email' : email }, function(err, player) {
        // Error found
      if (err) return done(err, false, { message: "Something went wrong." });

        // No error but already a player registered
      if (player) return done(null, false, { message: "Please choose another email." });
      
      var newPlayer = new Player();
      newPlayer.local.email = email;
      newPlayer.local.username = req.body.username;
      newPlayer.local.fullname = req.body.fullname;
      newPlayer.local.image = req.body.image;
      newPlayer.local.description = req.body.description;
      newPlayer.local.password = Player.encrypt(password);
      newPlayer.local.sport = req.body.sport;
      newPlayer.save(function(err, player) {

          // Error found
        if (err) return done(err, false, { message: "Something went wrong." });

          // New player created
        return done(null, player);

      });
    });
  }));
}




