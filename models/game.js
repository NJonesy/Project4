var mongoose = require("mongoose");
var bcrypt   = require('bcrypt-nodejs');


var gameSchema = new mongoose.Schema({
  creator: { type: mongoose.Schema.ObjectId, ref: 'Player' },
  sport: String,
  date: Date,
  start_time: String,
  end_time: String,
  number_of_players: Number,
  comment: String,
  placeId: String,
  placeName: String,
  lat: Number,
  lng: Number,
  address: String
});

module.exports = mongoose.model("Game", gameSchema);