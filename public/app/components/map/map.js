angular.module('App').component('mapComp', {
    templateUrl: 'app/components/map/map.html',
    controller: MapCompCtrl,
    controllerAs: 'mapCompCtrl'
});

function MapCompCtrl($http, DirectionsServices) {
    var mapComp = this;
    var map;

    DirectionsServices.getDirections();

    mapComp.buildMap = function(){
      // CREATE MAP AFTER LOAD
      window.onload = function() {
          // CREATE MAP
          map = L.map('map', {
              layers: MQ.mapLayer(),
              center: [
                  47.6062, -122.3321
              ],
              zoom: 13
          });

          // ADD MAP LAYERS
          // L.control.layers({
          //   'Map': MQ.mapLayer(),
          //   'Hybrid': MQ.hybridLayer(),
          //   'Satellite': MQ.satelliteLayer(),
          //   'Dark': MQ.darkLayer(),
          //   'Light': MQ.lightLayer()
          // }).addTo(map);
      };
    }

    mapComp.centerOnCurrentLocation = function(){
      var popup = L.popup();
      
      // ADD CURRENT LOCATION AND RE-CENTER MAP
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            console.log(position.coords)
            console.log(position.coords.latitude, position.coords.longitude)
              var latLng = {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude
              };

              console.log(latLng)

              popup.setLatLng(latLng);
              popup.setContent('Current Location');
              popup.openOn(map);

              map.setView(latLng, 13);
          }, function() {
              geolocationErrorOccurred(true, popup, map.getCenter());
          });
      } else {
          //No browser support geolocation service
          geolocationErrorOccurred(false, popup, map.getCenter());
      }

      // ERROR HANDLER FOR IF GEOLOCATION NOT AVAILABLE
      function geolocationErrorOccurred(geolocationSupported, popup, latLng) {
          popup.setLatLng(latLng);
          popup.setContent(geolocationSupported
              ? '<b>Error:</b> The Geolocation service failed.'
              : '<b>Error:</b> This browser doesn\'t support geolocation.');
          popup.openOn(map);
      }
    }

    mapComp.addPoints = function(){
      console.log("adding points");

      var geojsonFeature = {
        type: "Feature",
        properties: {
          name: "home",
          popupContent: "Home"
        },
        geometry: {
          type: "point",
          coordinates: [47.6824101, -122.3299868]
        }
      }
    }

    mapComp.buildMap();
    mapComp.centerOnCurrentLocation();

}

MapCompCtrl.$inject = ['$http', 'DirectionsServices']
