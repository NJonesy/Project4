angular
.module('GetAGame')
.controller('GamesController', GamesController);

GamesController.$inject = ['Game', 'uiGmapGoogleMapApi'];
function GamesController(Game, uiGmapGoogleMapApi) {

  var self = this;

  this.all = Game.query();
  this.newGame = {};
  this.place = {};

  self.addGame = function() {
    Game.save(self.newGame, self.place, function(newGame) {
      self.all.push(self.newGame, self.place);
      console.log(self.newGame, self.place);
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

      self.place = autocomplete.getPlace();
      console.log(self.place);
      
      self.newGame.placeId = place.id;
      console.log(self.newGame.placeId)
      self.newGame.placeName = place.name;

      self.newGame.lat = self.place.geometry.location.lat();
      self.newGame.lng = self.place.geometry.location.lng();

      marker.setPlace({
        placeId: self.place.place_id,
        location: self.place.geometry.location
      });

      marker.setVisible(true);
      map.panTo(marker.getPlace().location);

    });
  })
};


  