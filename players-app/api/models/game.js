var mongoose = require("mongoose");
var bcrypt   = require('bcrypt-nodejs');


var gameSchema = new mongoose.Schema({
  sport: String,
  date: Date,
  start_time: Date,
  end_time: Date,
  number_of_players: Number,
  comment: String,
  place: String
});

module.exports = mongoose.model("Game", gameSchema);