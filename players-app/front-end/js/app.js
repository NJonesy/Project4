angular
  .module('GetAGame', ['angular-jwt', 'ngResource', 'ui.router'])
  .constant('API', 'http://localhost:3000/api')
  .config(MainRouter)
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
  });

  MainRouter.$inject = ["$stateProvider", "$urlRouterProvider"];
  function MainRouter($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: "/",
        templateUrl: "home.html",
      })
      .state('register', {
          url: "/register",
          templateUrl: "register.html",
        })
      .state('login', {
          url: "/login",
          templateUrl: "login.html",
        })
      .state('players', {
          url: "/players",
          templateUrl: "players.html",
        })
      .state('create_game', {
          url: "/create_game",
          templateUrl: "create_game.html",
        })
      .state('games', {
          url: "/games",
          templateUrl: "games.html",
        });

    
    $urlRouterProvider.otherwise("/");
  }