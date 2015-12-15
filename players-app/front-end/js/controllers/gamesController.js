angular
.module('GetAGame')
.controller('GamesController', GamesController);

GamesController.$inject = ['Game', 'uiGmapGoogleMapApi'];
function GamesController(Game, uiGmapGoogleMapApi) {

  var self = this;

  this.all = Game.query();
  this.newGame = {};
  

  self.addGame = function() {
    Game.save(self.newGame, function(newGame) {
      self.all.push(newGame);
      self.newGame = {};
    })
  };

  uiGmapGoogleMapApi.then(function(maps) {

   self.map = new maps.Map(document.getElementById('main-map'), 
    { center: { lat: 51.5081, lng: -0.1000 }, zoom: 14 });
 })
};


