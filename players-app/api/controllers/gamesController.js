var Game = require('../models/game');
var Player = require('../models/player');


function gamesIndex(req, res) {
  Player.find(function(err, player){
    if (err) return res.status(404).json({ message: 'Something went wrong. '});
    res.status(200).json({ games: games });
  });
}

function gamesShow(req, res) {
  Player.findById(req.params.id, function(err, player){
    if (err) return res.status(404).json({ message: 'Something went wrong. '});
    res.status(200).json({ game: game });
  });
}

// New
function gamesCreate(req, res) {
  console.log(req.file, req.body);
  Player.findById(req.player._id, function(err, player){
    if(err) return res.render({messsage: 'Could not create game because ' + err});
    player.local.game = {
      sport: req.body.sport,
      place: req.body.place,
      date: req.body.date,
      start_time: req.body.start_time,
      end_time: req.body.end_time,
      number_of_players: req.body.number_of_players,
      comments: req.body.comments
    };
    
    player.save(function(err){
      if(err) return res.status(500).json({message: 'Could not add game to player because ' + err});
      return res.status(200).json({ game: player.local.game });
    });
  });
};

function gamesUpdate(req, res) {
  Game.findByIdAndUpdate({ _id:req.params.id }, 
  {
    sport: req.body.sport,
    place: req.body.place,
    date: req.body.date,
    start_time: req.body.start_time,
    end_time: req.body.end_time,
    number_of_players: req.body.number_of_players,
    comments: req.body.comments
  },

  function(err, game) {
    if(err) return res.render('err', {message: 'Could not update game b/c:' + err});
    game.save(function(err) {
      if (err) return res.status(500).json({ message: "Something went wrong!" });
      return res.status(201).json({ message: 'Game successfully updated.', game: game })
    });
  });
}

function gamesDelete(req, res){
  Game.findByIdAndRemove({_id: req.params.id}, function(err){
   if (err) return res.status(404).json({message: 'Something went wrong.'});
   res.status(200).json({message: 'Player has been successfully deleted'});
  });
}

module.exports = {
  gamesIndex:  gamesIndex,
  gamesShow:   gamesShow,
  gamesCreate: gamesCreate,
  gamesUpdate: gamesUpdate,
  gamesDelete: gamesDelete
} 





