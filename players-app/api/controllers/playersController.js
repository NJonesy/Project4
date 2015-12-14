var Player = require('../models/player');
var Game = require('../models/game');

function playersIndex(req, res) {
  Player.find(function(err, players){
    if (err) return res.status(404).json({ message: 'Something went wrong. '});
    res.status(200).json({ players: players });
  });
}

function playersShow(req, res) {
  Player.findById(req.params.id, function(err, player){
    if (err) return res.status(404).json({ message: 'Something went wrong. '});
    res.status(200).json({ player: player });
  });
}

function playersUpdate(req, res) {
  console.log(req.body)
  Player.findByIdAndUpdate({ _id:req.params.id }, 
  {
    username: req.body.username,
    fullname: req.body.fullname,
    image: req.body.image,
    sport: req.body.sport,
    description: req.body.description,
    email: req.body.email,
    password: req.body.password,
    game: req.body.game
  },
  { new: true },
  function(err, player) {
    if(err) return res.render('err', {message: 'Could not update player b/c:' + err});
    player.save(function(err) {
      if (err) return res.status(500).json({ message: "Something went wrong!" });
      return res.status(201).json({ message: 'Player successfully updated.', player: player })
    });
  });
}

function playersDelete(req, res){
  Player.findByIdAndRemove({_id: req.params.id}, function(err){
   if (err) return res.status(404).json({message: 'Something went wrong.'});
   res.status(200).json({message: 'Player has been successfully deleted'});
  });
}

module.exports = {
  playersIndex:  playersIndex,
  playersShow:   playersShow,
  playersUpdate: playersUpdate,
  playersDelete: playersDelete
} 



