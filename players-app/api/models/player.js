var mongoose = require("mongoose");
var bcrypt   = require('bcrypt-nodejs');
var Game     = require('./game');

var playerSchema = new mongoose.Schema({
    username: String,
    fullname: String,
    image: String,
    sport: String,
    description: String,
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    game: [Game.schema]
});

playerSchema.statics.encrypt = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

playerSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
}

module.exports = mongoose.model("Player", playerSchema);