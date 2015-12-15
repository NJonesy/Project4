angular
  .module('GetAGame', ['angular-jwt', 'ngResource', 'ui.router'])
  .constant('API', 'http://localhost:3000/api')
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
  })
  .config(MainRouter);

  MainRouter.$inject = ["$stateProvider", "$urlRouterProvider"];
  function MainRouter($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: "/",
        templateUrl: "js/templates/home.html",
      })
      .state('register', {
          url: "/register",
          templateUrl: "js/templates/register.html",
        })
      .state('login', {
          url: "/login",
          templateUrl: "js/templates/login.html",
        })
      .state('players', {
          url: "/players",
          templateUrl: "js/templates/players.html",
        })
      .state('create_game', {
          url: "/create_game",
          templateUrl: "js/templates/create_game.html",
        })
      .state('games', {
          url: "/games",
          templateUrl: "js/templates/games.html",
        });

    
    $urlRouterProvider.otherwise("/");
  }