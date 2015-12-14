var mongoose = require("mongoose");
var bcrypt   = require('bcrypt-nodejs');


var gameSchema = new mongoose.Schema({
  local: {
    sport: String,
    date: Date,
    start_time: Date,
    end_time: Date,
    number_of_players: Number,
    comments: String,
    place: String
  }
});

module.exports = mongoose.model("Game", gameSchema);