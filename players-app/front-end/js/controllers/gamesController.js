angular
  .module('GetAGame')
  .controller('GamesController', GamesController);

GamesController.$inject = ['Game'];
function GamesController(Game) {

    var self = this;

    this.all = Game.query();
    this.newGame = {};

    self.addGame = function() {
      Game.save(self.newGame, function(newGame) {
        self.all.push(newGame);
        self.newGame = {};
      })
    };
}
