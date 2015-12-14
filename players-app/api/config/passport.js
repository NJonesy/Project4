var LocalStrategy = require("passport-local").Strategy;
var Player        = require("../models/player");

module.exports = function(passport) {

  passport.use('local-sign-up', new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true,
  }, function(req, email, password, done) {

      // Find a player with this email
    Player.findOne({ 'email' : email }, function(err, player) {
        // Error found
      if (err) return done(err, false, { message: "Something went wrong." });

        // No error but already a player registered
      if (player) return done(null, false, { message: "Please choose another email." });
      
      var newPlayer = new Player();
      newPlayer.email = email;
      newPlayer.username = req.body.username;
      newPlayer.fullname = req.body.fullname;
      newPlayer.image = req.body.image;
      newPlayer.biography = req.body.biography;
      newPlayer.password = Player.encrypt(password);
      newPlayer.sport = req.body.sport;
      newPlayer.save(function(err, player) {

          // Error found
        if (err) return done(err, false, { message: "Something went wrong." });

          // New player created
        return done(null, player);

      });
    });
  }));
}




