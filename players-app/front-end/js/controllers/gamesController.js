angular
  .module('games')
  .controller('gamesController', GameController);

GamesController.$inject = ['Game'];
function GamesController(Game) {

    var self = this;

    self.all = [];
    self.game = {};
    self.newGame = {};

    function handleLogin(res) {
      var token = res.token ? res.token : null;

      if(token) {
        console.log(res);

        self.getGames();
        self.game = TokenService.getGame());
      }

        self.message = res.message;
    }

    self.addGame = function() {
      Game.addGame(self.game, handleLogin, { game: self.newGame })
        .then(function(res) {
          self.all.push(self.newGame);
          self.newGame = {};
        });
    }

    self.getGames = function() {
      self.all = Player.query(function(data) {
        return data.players.game;
      });
    }
}
