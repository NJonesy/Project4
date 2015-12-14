angular
  .module('players')
  .controller('playersController', PlayerController)

PlayerController.$inject = ['Player', 'TokenService']
function PlayerController(Player, TokenService) {
  var self = this;

  self.all = [];
  self.player = {};

  function handleLogin(res) {
    var token = res.token ? res.token : null;

    if(token) {
      console.log(res);

      self.getPlayers();
      self.player = TokenService.getPlayer();
    }

      self.message = res.message;
  }

  self.login = function() {
    Player.login(self.player, handleLogin);
  }  

  self.register = function() {
    Player.register(self.player, handleLogin);
  }

  self.disappear = function() {
    TokenService.removeToken();
    self.all = [];
  }

  self.getPlayers = function() {
    self.all = Player.query(function(data) {
      return data.players;
    });
  }

  self.isLoggedIn = function() {
    return !!TokenService.getToken();
  }

  if(self.isLoggedIn()) {
    self.getPlayers();
    self.player = TokenService.getPlayer();
  }

  self.redirectRegister = function(){
    self.location.url('/#register');
  }  

  self.redirectLogin = function(){
    self.location.url('/#login');
  }  
}
