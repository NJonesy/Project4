angular
  .module('GetAGame')
  .service('TokenService', TokenService);

TokenService.$inject = ["$window", "jwtHelper"];
function TokenService($window, jwtHelper) {

  var self = this;


  self.saveToken = function(token) {
    $window.localStorage.setItem('token', token);
  }

  self.getToken = function() {
   return $window.localStorage.getItem('token');
   console.log(token);
  }

  self.removeToken = function() {
    $window.localStorage.removeItem('token');
  }

  self.getPlayer = function() {
    var token = self.getToken();
    return jwtHelper.decodeToken(token);
  }
}