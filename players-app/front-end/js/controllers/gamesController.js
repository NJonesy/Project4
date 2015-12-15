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
      console.log(newGame);
      self.newGame = {};
    })
  };

  uiGmapGoogleMapApi.then(function(maps) {

    var map = new maps.Map(
      document.getElementById('main-map'),
      {
        center: {
          lat: 51.5081,
          lng: -0.1000
      },
      zoom: 14
    });

    var input = document.getElementById('place');

    var autocomplete = new maps.places.Autocomplete(input);

    var marker = new maps.Marker({
      map: map
    });

    maps.event.addListener(autocomplete, 'place_changed', function() {

      var place = autocomplete.getPlace();
      console.log(place);
      
      // self.newGame.placeId = place.id;
      // self.newGame.placeName = place.name;

      // self.newGame.lat = place.geometry.location.lat();
      // self.newGame.lng = place.geometry.location.lng();

      marker.setPlace({
        placeId: place.place_id,
        location: place.geometry.location
      });

      marker.setVisible(true);
      map.panTo(marker.getPlace().location);

    });
  })
};


  