angular.module('App').component('mapComp', {
    templateUrl: 'app/components/map/map.html',
    controller: MapCompCtrl,
    controllerAs: 'mapComp',
    // myRecipient: '=', // Bind the ngModel to the object given
    // onSend: '&',      // Pass a reference to the method
    // fromName: '@'     // Store the value associated by fromName
    // bindings: {
    //     start: '=',
    //     end: '='
    // }
});

function MapCompCtrl($http, DirectionsServices) {
    var mapComp = this;
    mapComp.start = '503 1st Ave W, Seattle';
  	mapComp.end = '1218 3rd Ave, Seattle';

    mapComp.initMap = function() {
        mapScope = this;
        // INIT DIRECTIONS SERVICE AND RENDERER
        mapComp.directionsService = new google.maps.DirectionsService();
        mapComp.directionsDisplay = new google.maps.DirectionsRenderer({draggable: true});
        // SET DEFAULT LAT/LNG IN SEATTLE
        var latLng = {
            lat: 47.608013,
            lng: -122.335167
        };
        // FIND CURRENT LAT/LNG IF NAVIGATOR ENABLED
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                latLng = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                makeMap(latLng);
                var infoWindow = new google.maps.InfoWindow({map: mapComp.mapid});
                infoWindow.setPosition(latLng);
                infoWindow.setContent('Location found.');
                mapComp.mapid.setCenter(latLng);
            }, function() {
                // USE DEFAULT LAT/LNG BECAUSE ERROR OCCURRED GETTING LAT/LNG
                makeMap(latLng);
            });
        } else {
            // NO BROSWER SUPPORT FOR LAT/LNG, USE DEFAULT LAT/LNG
            makeMap(latLng);
        }

        function makeMap(latLng) {
            // CREATE GOOGLE MAP WITH LAT/LNG
            mapComp.mapid = new google.maps.Map(document.getElementById('mapid'), {
                center: latLng,
                zoom: 12
            });

            // SET THE DIRECTIONS DISPLAY TO BE ON THE MAP AND ASSIGN THE DIRECTIONS TEXT TO DIRECTIONS PANEL
            mapComp.directionsDisplay.setMap(mapComp.mapid);
            mapComp.directionsDisplay.setPanel(document.getElementById('directionsPanel'));

            // WHEN ROUTE IS DRAGGED OR CHANGED, RETURN DIRECTIONS
            mapComp.directionsDisplay.addListener('directions_changed', function() {
                // TODO: show or get alternate routes on redraw
                var newDirections = mapComp.directionsDisplay.getDirections()
                console.log("DIRECTIONS AFTER CHANGE ROUTE", newDirections);
                mapComp.latLngArray = mapScope.polylinesToLatLngArr(newDirections.routes)
                console.log("LAT/LNG AFTER CHANGING ROUTE: ", mapComp.latLngArray)
            });

            // WHEN ROUTE OPTION IS CHANGED, RETURN DIRECTIONS
            google.maps.event.addListener(mapComp.directionsDisplay, 'routeindex_changed', function() {
                mapScope.removeMarkers();
                mapScope.removeBox();
                //current routeIndex
                console.log("SELECTED ROUTE INDEX: ", this.getRouteIndex());
                //current route
                newRoutes = this.getDirections().routes
                console.log("SELECTED ROUTE: ", newRoutes);
                mapComp.latLngArray = mapScope.polylinesToLatLngArr(newRoutes)
                mapScope.addMarkers();
                mapScope.getRouteBox();
            });
        }

    }

    mapComp.calcRoute = function(start, end, delay) {

        mapScope = this;
        if (!start) {
            start = mapComp.start
        }
        if (!end) {
            end = mapComp.end
        }
        if (!delay) {
            delay = 0; //milliseconds
        }

        var request = {
            origin: start,
            destination: end,
            travelMode: 'DRIVING',
            avoidTolls: false,
            provideRouteAlternatives: true,
            drivingOptions: {
                departureTime: new Date(new Date().getTime() + delay)
            }
        }

        mapComp.directionsService.route(request, function(result, status) {
          console.log("getting route...")
            if (status == 'OK') {
              console.log("getting route... status OK")
                mapComp.directionsResult = result;
                mapComp.directionsDisplay.setDirections(result);
                console.log("DIRECTIONS RESULT: ", mapComp.directionsResult)
                mapComp.overviewPath = mapComp.directionsResult.routes[0].overview_path
                mapComp.latLngArray = mapScope.polylinesToLatLngArr(mapComp.directionsResult.routes);
                console.log("LAT/LNG DIRECTIONS RESULT: ", mapComp.latLngArray)
            }
        });
    }

    mapComp.polylinesToLatLngArr = function(routes) {
        coordinateArrs = [];
        routes.forEach(function(route) {
            routeCoordinates = route.overview_path.map(function(item) {
                coordinate = {
                    "lat": item.lat(),
                    "lng": item.lng()
                }
                return coordinate;
            })
            coordinateArrs.push(routeCoordinates);
        })
        return coordinateArrs;
    }

    mapComp.addMarkers = function() {
        var index = mapComp.directionsDisplay.getRouteIndex()
        console.log("ROUTE INDEX: ", index);
        mapComp.markers = [];
        console.log("ROUTES ARRAY: ", mapComp.latLngArray);
        console.log("CURRENT ROUTES ARRAY TO ADD MARKERS TO: ", mapComp.latLngArray[index]);
        mapComp.latLngArray[index].forEach(function(coordinate) {
            var latLng = new google.maps.LatLng(coordinate.lat, coordinate.lng);
            var marker = new google.maps.Marker({position: latLng, map: mapComp.mapid})
            mapComp.markers.push(marker);
        })
    }

    mapComp.removeMarkers = function() {
        if (mapComp.markers && mapComp.markers.length > 0) {
            mapComp.markers.forEach(function(marker) {
                marker.setMap(null);
            })
        }
    }

    mapComp.getRouteBox = function(){
      var index = mapComp.directionsDisplay.getRouteIndex();
      var firstCoord = mapComp.latLngArray[index][0];

      var box = {
        lat:{
          south: firstCoord.lat,
          north: firstCoord.lat
        },
        lng: {
          west: firstCoord.lng,
          east:firstCoord.lng
        }
      }

      mapComp.latLngArray[index].forEach(function(coordinate) {
          if(coordinate.lat > box.lat.north){
            box.lat.north = coordinate.lat;
          }
          if(coordinate.lat < box.lat.south){
            box.lat.south = coordinate.lat;
          }
          if(coordinate.lng > box.lng.east){
            box.lng.east = coordinate.lng;
          }
          if(coordinate.lng < box.lng.west){
            box.lng.west = coordinate.lng;
          }
      })

      mapComp.boxCoordinates = [
          {lat: box.lat.north, lng: box.lng.west},
          {lat: box.lat.north, lng: box.lng.east},
          {lat: box.lat.south, lng: box.lng.east},
          {lat: box.lat.south, lng: box.lng.west}
      ]

      console.log("BOX COORDS:", mapComp.boxCoordinates)

      mapComp.mapBox = new google.maps.Polygon({
        paths: mapComp.boxCoordinates
      })
      mapComp.mapBox.setMap(mapComp.mapid)

    }

    mapComp.removeBox = function(){
      if(mapComp.mapBox){
        mapComp.mapBox.setMap(null)
      }
    }

    mapComp.initMap();

}

MapCompCtrl.$inject = ['$http', 'DirectionsServices']
