angular
.module('GetAGame')
.controller('GamesController', GamesController);

GamesController.$inject = ['Game', 'uiGmapGoogleMapApi', '$scope'];
function GamesController(Game, uiGmapGoogleMapApi, $scope) {

 var self = this;

 this.all = Game.query();
 this.newGame = {};
 this.place = {};
 this.sportSearch = "";
 this.numberSearch = "";
 this.markers = [];

 self.addGame = function() {
   Game.save(self.newGame, function(newGame) {
     self.all.push(newGame);
     console.log(newGame);
     self.newGame = {};
   })
 };

 uiGmapGoogleMapApi.then(function(maps) {

   var search_map = new maps.Map(
     document.getElementById('search_map'),
     {
       center: {
         lat: 51.5081,
         lng: -0.1000
     },
     zoom: 14
   });

   createMarker = function(info) {

     var marker = new maps.Marker({
              map: search_map,
              position: new maps.LatLng(info.lat, info.lng),
              title: info.sport
          });
     console.log(marker);

     self.markers.push(marker);
     console.log(self.markers)
   }

   console.log(self.markers)

   for (i = 0; i < self.all.length; i++) {
     createMarker(self.all[i]);
   }

       console.log(self.all.length)

 });

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

   var input = document.getElementById('google-place');

   var autocomplete = new maps.places.Autocomplete(input);

   var marker = new maps.Marker({
     map: map
   });

   maps.event.addListener(autocomplete, 'place_changed', function() {

     self.place = autocomplete.getPlace();
     
     self.newGame.placeId = self.place.id;
     self.newGame.placeName = self.place.name;

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

 $scope.$watch('nas', function (newValue, oldValue) {
     for (jdx in self.markers) {
         self.markers[jdx].setMap(null);
     }
     self.markers = [];
     for (idx in $scope.nas) {
       createMarker($scope.nas[idx]);
     }
 }, true);
 
};



// angular
// .module('GetAGame')
// .controller('GamesController', GamesController);

// GamesController.$inject = ['Game', 'uiGmapGoogleMapApi', '$scope'];
// function GamesController(Game, uiGmapGoogleMapApi, $scope) {

//   var self = this;

//   this.all = Game.query();
//   this.newGame = {};
//   this.place = {};
//   this.sportSearch = "";
//   this.numberSearch = "";
//   this.markers = [];

//   self.addGame = function() {
//     Game.save(self.newGame, function(newGame) {
//       self.all.push(newGame);
//       console.log(newGame);
//       self.newGame = {};
//     })
//   };

//   uiGmapGoogleMapApi.then(function(maps) {

//     var search_map = new maps.Map(
//       document.getElementById('search_map'),
//       {
//         center: {
//           lat: 51.5081,
//           lng: -0.1000
//       },
//       zoom: 14
//     });

//     var createMarker = function(info) {

//       var marker = new maps.Marker({
//                map: search_map,
//                position: new maps.LatLng(info.lat, info.lng),
//                title: info.sport
//            });
//       console.log(marker);

//       self.markers.push(marker);
//       console.log(self.markers)
//     }

//     console.log(self.markers)

//     for (i = 0; i < self.all.length; i++) {
//       createMarker(self.all[i]);
//     }

//         console.log(self.all.length)

//   });

//   uiGmapGoogleMapApi.then(function(maps) {

//     var map = new maps.Map(
//       document.getElementById('main-map'),
//       {
//         center: {
//           lat: 51.5081,
//           lng: -0.1000
//       },
//       zoom: 14
//     });

//     var input = document.getElementById('google-place');

//     var autocomplete = new maps.places.Autocomplete(input);

//     var marker = new maps.Marker({
//       map: map
//     });

//     maps.event.addListener(autocomplete, 'place_changed', function() {

//       self.place = autocomplete.getPlace();
      
//       self.newGame.placeId = self.place.id;
//       self.newGame.placeName = self.place.name;

//       self.newGame.lat = self.place.geometry.location.lat();
//       self.newGame.lng = self.place.geometry.location.lng();

//       marker.setPlace({
//         placeId: self.place.place_id,
//         location: self.place.geometry.location
//       });

//       marker.setVisible(true);
//       map.panTo(marker.getPlace().location);

//     });
//   })

//   $scope.$watch('nas',

//   function (newValue, oldValue) {
//       for (jdx in $scope.markers) {
//           $scope.markers[jdx].setMap(null);
//       }
//       $scope.markers = [];
//       for (idx in $scope.nas) {
//           createMarker($scope.nas[idx]);
//       }
//   }, true);

// };

  