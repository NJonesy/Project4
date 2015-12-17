var Player = require('../models/player');
var Game = require('../models/game');

function playersIndex(req, res) {
  Player.find(function(err, players){
    if (err) return res.status(404).json({ message: 'Something went wrong. '});
    res.status(200).json(players);
  });
}

function playersShow(req, res) {
  Player.findById(req.params.id, function(err, player){
    if (err) return res.status(404).json({ message: 'Something went wrong. '});
    res.status(200).json(player);
  });
}

function playersUpdate(req, res) {
  console.log(req.body)
  Player.findByIdAndUpdate({ _id:req.params.id }, req.body,
  { new: true },
  function(err, player) {
    if(err) return res.render('err', {message: 'Could not update player b/c:' + err});
    return res.status(201).json(player);
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



