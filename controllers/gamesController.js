var Game = require('../models/game');
var Player = require('../models/player');


function gamesIndex(req, res) {
  Game.find().populate('creator').exec(function(err, games){
    //alternatively Game.find(function(err, games){
    if (err) return res.status(404).json({ message: 'Something went wrong. '});
    res.status(200).json(games);
  });
}

function gamesShow(req, res) {
  var id = req.params.id;

  Game.findById({_id: id}, function(err, game){
    if (err) return res.status(404).json({ message: 'Something went wrong. '});
    res.status(200).json(game);
  });
}

// New
function gamesCreate(req, res) {
  var game = new Game(req.body);
  game.creator = req.user._id; //alternatively delete this line
  
  game.save(function(err){
    if(err) return res.status(500).json({message: 'Could not save game because ' + err});
    return res.status(200).json(game);
  });
};

function gamesUpdate(req, res) {
  Game.findByIdAndUpdate(req.params.id, req.body, function(err, game) {
    if(err) return res.status(500).json({message: 'Could not update game b/c:' + err});
    return res.status(201).json({ message: 'Game successfully updated.', game: game });
  });
}

function gamesDelete(req, res){
  Game.findByIdAndRemove({_id: req.params.id}, function(err){
   if (err) return res.status(404).json({message: 'Something went wrong.'});
   res.status(200).json({message: 'Game has been successfully deleted'});
  });
}

module.exports = {
  gamesIndex: gamesIndex,
  gamesShow: gamesShow,
  gamesCreate: gamesCreate,
  gamesUpdate: gamesUpdate,
  gamesDelete: gamesDelete
} 





