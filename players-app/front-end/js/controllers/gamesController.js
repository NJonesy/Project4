angular
  .module('GetAGame')
  .controller('GamesController', GamesController);

GamesController.$inject = ['Game'];
function GamesController(Game) {

    var self = this;

    self.all = [];
    self.newGame = {};


    self.addGame = function() {
        self.all.push(self.newGame);
        self.newGame = {};
      };


    // self.getGames = function() {
    //   self.all = Player.query(function(data) {
    //     return data.players.game;
    //   });
    // }
}
