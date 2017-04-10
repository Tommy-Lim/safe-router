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

function MapCompCtrl($http, $element, $interval, $scope, $timeout, CrimeService) {
    var mapComp = this;
    mapComp.CrimeService = CrimeService;
    mapComp.showSettings = false;
    mapComp.showControls = true;
    mapComp.showCrimeList = false;
    mapComp.start = '';
    mapComp.end = '';
    mapComp.controls = {heatmap: true, border: false, traffic: false, crimes: false};
    mapComp.sensitivity = 3;
    mapComp.padding = 0.003;
    mapComp.crimeWindow = 12;
    mapComp.markers = [];
    mapComp.infoWindows = [];
    mapComp.routeIndex;
		mapComp.mapLoading = true;
		mapComp.crimesLoading = false;
		mapComp.mapCenter;
    mapComp.physical = true;
    mapComp.weapon = true;
    mapComp.vehicle = false;
    mapComp.jerk = false;

		function setMapLoading(val) {
			mapComp.mapLoading = val;
      $scope.$apply();

		}

    // INITILAIZE MAP
    function initMap() {

				setMapLoading(true);
        // INIT DIRECTIONS SERVICE AND RENDERER
        mapComp.directionsService = new google.maps.DirectionsService();
        mapComp.directionsDisplay = new google.maps.DirectionsRenderer({
            draggable: true,
            polylineOptions: {
                strokeColor: "#4eb4fa",
                strokeOpacity: .8,
                strokeWeight: 8
            }
        });
        // SET DEFAULT LAT/LNG IN SEATTLE
        mapComp.mapCenter = {
            lat: 47.608013,
            lng: -122.335167
        };
        // PADDING DEGREES FROM CENTER OF MAP
        var autocompleteBoundsPadding = 0.05; // degrees from center
        // SET AUTOCOMPLETE BOUNDS
        mapComp.defaultBounds = new google.maps.LatLngBounds(new google.maps.LatLng(mapComp.mapCenter.lat + autocompleteBoundsPadding, mapComp.mapCenter.lng - autocompleteBoundsPadding), new google.maps.LatLng(mapComp.mapCenter.lat - autocompleteBoundsPadding, mapComp.mapCenter.lng + autocompleteBoundsPadding))
        mapComp.options = {
            bounds: mapComp.defaultBounds
        }
        // FIND CURRENT LAT/LNG IF NAVIGATOR ENABLED
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                mapComp.mapCenter = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                // SET BOUNDS FOR
                mapComp.defaultBounds = new google.maps.LatLngBounds(new google.maps.LatLng(mapComp.mapCenter.lat + autocompleteBoundsPadding, mapComp.mapCenter.lng - autocompleteBoundsPadding), new google.maps.LatLng(mapComp.mapCenter.lat - autocompleteBoundsPadding, mapComp.mapCenter.lng + autocompleteBoundsPadding))
                mapComp.options.bounds = mapComp.defaultBounds
                // USE NEW LAT/LNG
                makeMap(mapComp.mapCenter, true);

            }, function() {
                // USE DEFAULT LAT/LNG BECAUSE ERROR OCCURRED GETTING LAT/LNG
                makeMap(mapComp.mapCenter, false);
            });
        } else {
            // NO BROSWER SUPPORT FOR LAT/LNG, USE DEFAULT LAT/LNG
            makeMap(mapComp.mapCenter, false);
        }

        // ADD CENTER ICON TO MAP
        function addCenter(latLng) {
            var customIcon = {
                url: './img/marker_current.png',
                size: new google.maps.Size(20, 20),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(10, 10)
            }
            var GeoMarker = new GeolocationMarker(mapComp.mapid);
            GeoMarker.setMarkerOptions({'icon': customIcon, 'position': latLng})
        }

        function addStart(latLng) {
            var location = new google.maps.LatLng(latLng.lat, latLng.lng)
            var geocoder = new google.maps.Geocoder;
            geocoder.geocode({
              location: location
            }, function(results, status){
              if (status == "OK") {
                  var address = results[0].formatted_address;
                  mapComp.start = address;
                  $($('#start-input')[0]).val(address)
              } else{
                mapComp.start = '';
              }
            })
        }

        // MAKE MAP FUNCTION TO BE USED ABOVE
        function makeMap(latLng, hasLocation) {
            // CREATE GOOGLE MAP WITH LAT/LNG
            mapComp.mapid = new google.maps.Map(document.getElementById('mapid'), {
                center: latLng,
                zoom: 14,
                mapTypeControl: false,
                streetViewControl: false,
                fullscreenControl: false,
                styles: [
                    {
                        "stylers":[
                          {
                            "visibility": "off"
                          }
                        ]
                    },
                    {
                        "featureType": "all",
                        "elementType": "labels.text.fill",
                        "stylers": [
                            {
                                "color": "#6e6ece"
                            }
                        ]
                    }, {
                        "featureType": "all",
                        "elementType": "labels.text.stroke",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    }, {
                        "featureType": "all",
                        "elementType": "labels.icon",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    }, {
                        "featureType": "administrative",
                        "elementType": "geometry.fill",
                        "stylers": [
                            {
                                "color": "#3e356e"
                            }
                        ]
                    }, {
                        "featureType": "administrative",
                        "elementType": "geometry.stroke",
                        "stylers": [
                            {
                                "color": "#3e356e"
                            }, {
                                "weight": 1.2
                            }
                        ]
                    }, {
                        "featureType": "administrative",
                        "elementType": "labels",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    }, {
                        "featureType": "administrative.country",
                        "elementType": "all",
                        "stylers": [
                            {
                                "visibility": "simplified"
                            }
                        ]
                    }, {
                        "featureType": "administrative.country",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "visibility": "simplified"
                            }
                        ]
                    }, {
                        "featureType": "administrative.country",
                        "elementType": "labels.text",
                        "stylers": [
                            {
                                "visibility": "simplified"
                            }
                        ]
                    }, {
                        "featureType": "administrative.province",
                        "elementType": "all",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    }, {
                        "featureType": "administrative.locality",
                        "elementType": "all",
                        "stylers": [
                            {
                                "visibility": "simplified"
                            }
                        ]
                    }, {
                        "featureType": "administrative.neighborhood",
                        "elementType": "all",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    }, {
                        "featureType": "administrative.land_parcel",
                        "elementType": "all",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    }, {
                        "featureType": "landscape",
                        "elementType": "all",
                        "stylers": [
                            {
                                "visibility": "simplified"
                            }
                        ]
                    }, {
                        "featureType": "landscape",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#3e356e"
                            }
                        ]
                    }, {
                        "featureType": "landscape.man_made",
                        "elementType": "all",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    }, {
                        "featureType": "poi",
                        "elementType": "all",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    }, {
                        "featureType": "poi",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#2f2152"
                            }
                        ]
                    }, {
                        "featureType": "poi.business",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    }, {
                        "featureType": "road",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "visibility": "simplified"
                            }
                        ]
                    }, {
                        "featureType": "road.highway",
                        "elementType": "geometry.fill",
                        "stylers": [
                            {
                                "color": "#2f2152"
                            }
                        ]
                    }, {
                        "featureType": "road.highway",
                        "elementType": "geometry.stroke",
                        "stylers": [
                            {
                                "color": "#2f2152"
                            }, {
                                "weight": 0.2
                            }
                        ]
                    }, {
                        "featureType": "road.highway",
                        "elementType": "labels.text.fill",
                        "stylers": [
                            {
                                "color": "#6e6ece"
                            }
                        ]
                    }, {
                        "featureType": "road.highway",
                        "elementType": "labels.text.stroke",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    }, {
                        "featureType": "road.arterial",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#2f2152"
                            }
                        ]
                    }, {
                        "featureType": "road.arterial",
                        "elementType": "labels.text",
                        "stylers": [
                            {
                                "visibility": "on"
                            }
                        ]
                    }, {
                        "featureType": "road.arterial",
                        "elementType": "labels.text.fill",
                        "stylers": [
                            {
                                "color": "#6e6ece"
                            }
                        ]
                    }, {
                        "featureType": "road.arterial",
                        "elementType": "labels.text.stroke",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    }, {
                        "featureType": "road.local",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#2f2152"
                            }
                        ]
                    }, {
                        "featureType": "road.local",
                        "elementType": "labels.text",
                        "stylers": [
                            {
                                "visibility": "on"
                            }, {
                                "hue": "#6e6ece"
                            }
                        ]
                    }, {
                        "featureType": "road.local",
                        "elementType": "labels.text.fill",
                        "stylers": [
                            {
                                "color": "#6e6ece"
                            }
                        ]
                    }, {
                        "featureType": "road.local",
                        "elementType": "labels.text.stroke",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    }, {
                        "featureType": "transit",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#2f2152"
                            }
                        ]
                    }, {
                        "featureType": "water",
                        "elementType": "geometry",
                        "stylers": [
                            {
                              visibility: "on",
                            }
                        ]
                    }, {
                        "featureType": "water",
                        "elementType": "geometry.fill",
                        "stylers": [
                            {
                                "color": "#321F55"
                            }
                        ]
                    },{
                        "featureType": "water",
                        "elementType": "labels.text",
                        "stylers": [
                            {
                                "visibility": "on"
                            }
                        ]
                    }
                ]
						})

            // ADD INPUTS TO MAP
            var startInput = document.getElementById('start-input');
            var autocompleteStart = new google.maps.places.Autocomplete(startInput, mapComp.mapid.getBounds()); // second param can be mapComp.options
            autocompleteStart.addListener('place_changed', function() {
                var place = autocompleteStart.getPlace();
                if (!place.geometry) {
                    // console.log("place not found");
                } else {
                    mapComp.start = place.formatted_address;
										mapComp.calcRoute();
                }
            })
            // mapComp.mapid.controls[google.maps.ControlPosition.TOP_LEFT].push(endInput);
            var endInput = document.getElementById('end-input');
            var autocompleteEnd = new google.maps.places.Autocomplete(endInput, mapComp.mapid.getBounds()); // second param can be mapComp.options
            autocompleteEnd.addListener('place_changed', function() {
                var place = autocompleteEnd.getPlace();
                if (!place.geometry) {
                    // console.log("place not found");
                } else {
                    mapComp.end = place.formatted_address;
										mapComp.calcRoute();
                }
            })

            // SET THE DIRECTIONS DISPLAY TO BE ON THE MAP AND ASSIGN THE DIRECTIONS TEXT TO DIRECTIONS PANEL
            mapComp.directionsDisplay.setMap(mapComp.mapid);
            mapComp.directionsDisplay.setPanel(document.getElementById('directionsPanel'));

            // WHEN ROUTE IS DRAGGED OR CHANGED, RETURN DIRECTIONS
            mapComp.directionsDisplay.addListener('directions_changed', function() {
                var newDirections = mapComp.directionsDisplay.getDirections()
                mapComp.latLngArray = mapComp.polylinesToLatLngArr(newDirections.routes)
                mapComp.getRouteBox();
                mapComp.resetBounds();
                mapComp.getCrimes();
            });

            // WHEN ROUTE OPTION IS CHANGED, RETURN DIRECTIONS
            google.maps.event.addListener(mapComp.directionsDisplay, 'routeindex_changed', function() {
                mapComp.routeIndex = this.getRouteIndex();
                mapComp.resetVisuals();
                $timeout(function(){
                  $scope.$apply();
                })
            });

            // CLOSE ALL INFOWINDOWS ON CLICK;
            mapComp.mapid.addListener('click', function() {
                mapComp.closeInfoWindows();
            })

            // ADD CURRENT LOCATION TO MAP
            if(hasLocation){
              console.log("has location, so set center");
              addCenter(latLng);
              addStart(latLng);
            }
            setMapLoading(false);

        }
    }

    mapComp.closeInfoWindows = function() {
        mapComp.infoWindows.forEach(function(infoWindow) {
            infoWindow.close();
        })
    }

		mapComp.resetBounds = function(){
			var sw = new google.maps.LatLng(mapComp.box.lat.south, mapComp.box.lng.west);
			var ne = new google.maps.LatLng(mapComp.box.lat.north, mapComp.box.lng.east);
			var bounds = new google.maps.LatLngBounds(sw, ne);
			mapComp.mapid.fitBounds(bounds);
		}

    // CALCULATE ROUTE
    mapComp.calcRoute = function(start, end, delay) {
        // SET DEFAULTS
        if (!start) {
            start = mapComp.start
        }
        if (!end) {
            end = mapComp.end
        }
        if (!delay) {
            delay = 0; //milliseconds
        }

        // SETUP DIRECTIONS REQUEST OBJECT
        var request = {
            origin: start,
            destination: end,
            travelMode: 'WALKING',
            avoidTolls: false,
            provideRouteAlternatives: true,
            // drivingOptions: {
            //     departureTime: new Date(new Date().getTime() + delay)
            // }
        }


        // GET ROUTES USING DIRECTIONS SERVICE
        mapComp.directionsService.route(request, function(result, status) {
            if (status == 'OK') {
                mapComp.directionsResult = result;
                mapComp.directionsDisplay.setDirections(result);
                mapComp.latLngArray = mapComp.polylinesToLatLngArr(mapComp.directionsResult.routes);
            }
        });
    }

    // TURN POLYLINES ROUTES INTO LAT/LNG COORDINATE ARRAYS
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
        coordinateArrs = mapComp.interpolateGaps(coordinateArrs);
        return coordinateArrs;
    }

    mapComp.interpolateGaps = function(arrayOfCoordsArrays){
      // mapComp.latLngArray
      var newArrays = arrayOfCoordsArrays.map(function(route){
        for(var i=route.length-1; i>0; i--){
          var dy = route[i].lat - route[i-1].lat;
          var dx = route[i].lng - route[i-1].lng;
          var distance = Math.sqrt(Math.pow(dx,2) + Math.pow(dy,2));
          if( distance > 0.0001){
            var inner = [];
            var steps = 10;
            for(var j=1; j<steps; j++){
              var obj = {
                lat: route[i-1].lat + j*dy/steps,
                lng: route[i-1].lng + j*dx/steps
              }
              inner.push(obj);
            }
            var start = route.slice(0,i);
            var end = route.slice(i);
            route = start.concat(inner).concat(end);
          }
        }
        return route;
      })
      return newArrays;
    }

    //ADD LA/LNG MARKERS FOR THE CURRENT ROUTE
    mapComp.addCrimeMarkers = function(crimes) {
        mapComp.crimesLoading = true;
        var index = mapComp.routeIndex;
        crimes.forEach(function(coordinate) {
            var contentString = '<div id="content">' +
            '<div id="bodyContent">' +
            '<div class="info-date">' + coordinate.event_clearance_date.toLocaleString() + '</div>' + '<div class="info-location">' + coordinate.hundred_block_location + '</div>' + '<div class="clearance-desc">' + coordinate.event_clearance_description + '</div>' + '<div class="initial-desc">' + coordinate.initial_type_description + '</div>' + '</div>' + '</div>';
            var infoWindow = new google.maps.InfoWindow({content: contentString})
            var latLng = new google.maps.LatLng(coordinate.latitude, coordinate.longitude);
            var icon ='';
            switch(coordinate.event_clearance_code){
              case 10: case 31: case 40: case 43: case 49:
                icon = './img/body.png';
                break;
              case 30: case 63: case 71:
                icon = './img/vehicle.png';
                break;
              case 291: case 292:
                icon = './img/gun.png';
                break;
              case 41:
                icon = './img/harass.png';
                break;
              default:
                icon = './img/handcuff.png';
            }
            var marker = new google.maps.Marker({position: latLng, map: mapComp.mapid, icon: icon});
            marker.addListener('click', function() {
                mapComp.closeInfoWindows();
                infoWindow.open(mapComp.mapid, marker);
                mapComp.infoWindows.push(infoWindow);
            })
            mapComp.markers.push(marker);
        })
        // ADD MARKERS FOR PATH
        // mapComp.latLngArray[index].forEach(function(coordinate){
        //   var marker = new google.maps.Marker({position: new google.maps.LatLng(coordinate.lat, coordinate.lng), map: mapComp.mapid});
        //   mapComp.markers.push(marker);
        // })
        mapComp.crimesLoading = false;
    }

    // REMOVE LAT/LNG MARKERS FOR CURRENT ROUTE
    mapComp.toggleCrimeMarkers = function() {
        if (mapComp.controls.crimes) {
            mapComp.controls.crimes = false;
            if (mapComp.markers && mapComp.markers.length > 0) {
                mapComp.markers.forEach(function(marker) {
                    marker.setMap(null);
                })
            }
        } else {
            mapComp.controls.crimes = true;
            mapComp.addCrimeMarkers(mapComp.countedCrimes[mapComp.routeIndex]);
            // mapComp.addCrimeMarkers(mapComp.crimes);
        }

    }

    // ADD BOX ZONE FOR CURRENT ROUTE
    mapComp.getRouteBox = function(padding) {
        // SET PADDING FOR BOX
        if (mapComp.padding == 0) {
            padding = 0.000; //degree lat/lng
        } else if (!mapComp.padding) {
            padding = 0.005;
        } else {
            padding = mapComp.padding;
        }

        //GET ROUTE DETAILS
        var index = mapComp.directionsDisplay.getRouteIndex();
        var firstCoord = mapComp.latLngArray[index][0];

        // SET DEFAULTS FOR BOX
        mapComp.box = {
            lat: {
                south: firstCoord.lat,
                north: firstCoord.lat
            },
            lng: {
                west: firstCoord.lng,
                east: firstCoord.lng
            }
        }

        // FIND MIN/MAX FOR LAT/LNG
        mapComp.latLngArray.forEach(function(route) {
          route.forEach(function(coordinate){
            if (coordinate.lat > mapComp.box.lat.north) {
              mapComp.box.lat.north = coordinate.lat;
            }
            if (coordinate.lat < mapComp.box.lat.south) {
              mapComp.box.lat.south = coordinate.lat;
            }
            if (coordinate.lng > mapComp.box.lng.east) {
              mapComp.box.lng.east = coordinate.lng;
            }
            if (coordinate.lng < mapComp.box.lng.west) {
              mapComp.box.lng.west = coordinate.lng;
            }
          })
        })

        // ADD PADDING TO ZONE
        mapComp.box.lat.south -= padding;
        mapComp.box.lat.north += padding;
        mapComp.box.lng.east += 1.75 * padding;
        mapComp.box.lng.west -= 1.75 * padding;

        // BUILD LAT/LNG COORDINATE OBJECT FOR POLYGON
        mapComp.boxCoordinates = [
            {
                lat: mapComp.box.lat.north,
                lng: mapComp.box.lng.west
            }, {
                lat: mapComp.box.lat.north,
                lng: mapComp.box.lng.east
            }, {
                lat: mapComp.box.lat.south,
                lng: mapComp.box.lng.east
            }, {
                lat: mapComp.box.lat.south,
                lng: mapComp.box.lng.west
            }
        ]

    }

		mapComp.addBorder = function(){
			mapComp.controls.border = true;
			// BUILD BOX POLYGON
			mapComp.mapBox = new google.maps.Polygon({
				paths: mapComp.boxCoordinates,
				strokeColor: '#FF4D64',
				strokeOpacity: 0.8,
				fillColor: '#FF4D64',
				fillOpacity: 0.2
			})
			// SET POLYGON TO MAP
			mapComp.mapBox.setMap(mapComp.mapid)
		}

    // REMOVE POLYGON FROM MAP
    mapComp.removeBorder = function() {
      mapComp.controls.border = false;
        if (mapComp.mapBox) {
            mapComp.mapBox.setMap(null)
        }
    }

    mapComp.getCrimes = function() {
			  mapComp.crimesLoading = true;
        var crimes = mapComp.CrimeService.getCrimes(mapComp.box, mapComp.getCrimeCodes()).then(function(data) {
            mapComp.crimes = data.result;

            // FILTER RESULTS BASED ON USER SETTINGS
            var currentTime = new Date();
            var currentHour = currentTime.getHours();

            for (var i = mapComp.crimes.length - 1; i >= 0; i--) {

                // By Crime Window
                var crimeTime = mapComp.crimes[i].event_clearance_date;

                if (!crimeTime) {
                    mapComp.crimes.splice(i, 1);
                } else if (crimeTime) {
                    var crimeHour = parseInt(crimeTime.split(' ')[1].split(':')[0], 10);
                    var checkedTime = checkTime(currentHour, parseInt(mapComp.crimeWindow, 10), crimeHour);

                    if (checkedTime === false) {
                        mapComp.crimes.splice(i, 1);
                    } else {
                        // mapComp.crimes[i].event_clearance_date = new Date(crimeTime);
                        mapComp.crimes[i].event_clearance_date = new Date(crimeTime);
                    }

                    function checkTime(hour, spread, query) {
                        if (hour + spread > 24) {
                            min1 = hour - spread;
                            max1 = 24;
                            min2 = 0;
                            max2 = hour + spread - 24;
                            if (checkHour(query, min1, max1) || checkHour(query, min2, max2)) {
                                return true
                            } else {
                                return false
                            }

                        } else if (hour - spread < 0) {
                            min1 = 0;
                            max1 = hour + spread;
                            min2 = 24 - (spread - hour);
                            max2 = 24;
                            if (checkHour(query, min1, max1) || checkHour(query, min2, max2)) {
                                return true
                            } else {
                                return false
                            }
                        } else {
                            min = hour - spread;
                            max = hour + spread;
                            if (checkHour(query, min, max)) {
                                return true
                            } else {
                                return false
                            }
                        }
                    }

                    function checkHour(crimeHour, min, max) {
                        if (crimeHour >= min && crimeHour <= max) {
                            return true
                        } else {
                            return false;
                        }
                    }

                }

            }
            mapComp.plotCrimes();
            mapComp.findMatches();
        });
    }

    mapComp.getCrimeCodes = function(){
      crimesArray = [];
      if (mapComp.physical) {
          crimesArray = crimesArray.concat([10, 31, 40, 43, 49]);
      }
      if (mapComp.vehicle) {
          crimesArray = crimesArray.concat([30, 63, 71]);
      }
      if (mapComp.weapon) {
          crimesArray = crimesArray.concat([291, 292]);
      }
      if (mapComp.jerk) {
          crimesArray = crimesArray.concat([41]);
      }
      return crimesArray;
    }

    mapComp.plotCrimes = function() {
        var heatMapData = [];

        // ADD HEAT MAP DATA
        mapComp.crimes.forEach(function(crime) {
            heatMapData.push(new google.maps.LatLng(parseFloat(crime.latitude), parseFloat(crime.longitude)));
        })

        // CREATE NEW HEAT MAP IF DOES NOT EXIST
        var gradient = [
            'rgba(44, 255, 223, 0)',
            'rgba(44, 255, 223, 1)',
            'rgba(89, 248, 172, 1)',
            'rgba(157, 236, 108, 1)',
            'rgba(238, 228, 54, 1)',
            'rgba(255, 170, 48, 1)',
            'rgba(255, 148, 59, 1)',
            'rgba(255, 94, 89, 1)',
            'rgba(255, 71, 100, 1)',
            'rgba(255, 47, 117, 1)'
        ]
        if (true) {
            // DISASSOCIATE CURRENT HEATMAP
            if (mapComp.heatMap && mapComp.heatMap.getMap()) {
                mapComp.heatMap.setMap(null);
            }
            // REWRITE HEATMAP LAYER
            mapComp.heatMap = new google.maps.visualization.HeatmapLayer({data: heatMapData, radius: 15, gradient: gradient, opacity: .75})
            if(mapComp.controls.heatmap){
              // SET HEATMAP TO MAP
              mapComp.heatMap.setMap(mapComp.mapid);
              mapComp.controls.heatmap = true;
            }
        } else if (!mapComp.heatMapCreated) {
            // CREATE FIRST HEATMAP
            mapComp.heatMap = new google.maps.visualization.HeatmapLayer({data: heatMapData, radius: 15, gradient: gradient, opacity: .75})
            // SET FIRST HEATMAP TO MAP
            mapComp.heatMap.setMap(mapComp.mapid);
            mapComp.controls.heatmap = true;
            // FLIP BOOLEAN OF HEATMAP EVER CREATED
            mapComp.heatMapCreated = true;
        } else {
            // mapComp.heatMap.set('data', heatMapData);
        }

    }

    mapComp.toggleHeatmap = function(){
      mapComp.controls.heatmap = !mapComp.controls.heatmap;
      if(mapComp.heatMap){
        if(mapComp.heatMap.getMap()){
          mapComp.heatMap.setMap(null);
          // mapComp.heatMapCreated = false;
        } else{
          mapComp.heatMap.setMap(mapComp.mapid);
        }
      }
    }


    mapComp.toggleBorder = function() {
      mapComp.controls.border = !mapComp.controls.border;
        if (mapComp.controls.border) {
          mapComp.addBorder();
        } else{
					mapComp.removeBorder();
				}
    }

    mapComp.toggleTraffic = function() {
      mapComp.controls.traffic = !mapComp.controls.traffic;
        if (mapComp.trafficLayer) {
            if (mapComp.trafficLayer.getMap()) {
                mapComp.trafficLayer.setMap(null);
            } else {
                mapComp.trafficLayer.setMap(mapComp.mapid);
            }
        } else{
          mapComp.trafficLayer = new google.maps.TrafficLayer();
          mapComp.trafficLayer.setMap(mapComp.mapid);
        }
    }

    mapComp.findMatches = function() {

				mapComp.crimesLoading = true;
        var sensitivity;
        if (!mapComp.sensitivity) {
            sensitivity = 3;
        } else {
            sensitivity = mapComp.sensitivity;
        }
        var routes = angular.copy(mapComp.latLngArray);
        var crimes = angular.copy(mapComp.crimes);

        // DECLARE COUNTED CRIMES
        mapComp.countedCrimes = [
            [], [], [], []
        ];

        // ITERATE THROUGH EACH ROUTE AND COORDINATE
        // CHECK IF MATCHING CRIMES
        crimes.forEach(function(crime) {
          // ROUND CRIMES TO THOUSANDTHS < 500FT
          crime.lat = parseFloat(crime.latitude.toFixed(sensitivity));
          crime.lng = parseFloat(crime.longitude.toFixed(sensitivity));

          for(var index = 0; index<routes.length; index++){
              var crimeAdded = false;
              routes[index].forEach(function(coordinate) {
                  if(!crimeAdded){
                    // ROUND COORDINATES TO THOUSANDTHS < 500 FT
                    coordinate.latShort = parseFloat(coordinate.lat.toFixed(sensitivity));
                    coordinate.lngShort = parseFloat(coordinate.lng.toFixed(sensitivity));
                    // ADD TO COUNTED CRIMES IF MATCHING
                    if (crime.lat == coordinate.latShort && crime.lng == coordinate.lngShort) {
                      mapComp.countedCrimes[index].push(crime);
                      crimeAdded = true;
                    }
                  } else{
                    // crime already added to route
                  }
              })
          }
        })

				mapComp.crimesLoading = false;
        mapComp.resetVisuals();

    }

    mapComp.resetVisuals = function(){
      if(mapComp.controls.crimes){
        mapComp.toggleCrimeMarkers();
        mapComp.toggleCrimeMarkers();
      }
      if(mapComp.controls.traffic){
        mapComp.toggleTraffic();
        mapComp.toggleTraffic();
      }
      if(mapComp.controls.heatmap){
        mapComp.toggleHeatmap();
        mapComp.toggleHeatmap();
      }
      if(mapComp.controls.border){
        mapComp.toggleBorder();
        mapComp.toggleBorder();
      }
    }

    // SHOW/HIDE CONTROL PANEL
    mapComp.toggleControls = function() {
        mapComp.showControls = !mapComp.showControls;
        if (mapComp.showControls === false) {
          $("#mapid").css("width", "100%");
          $("#mapid").css("left", "0");
          if($(window).width() > 525){
            $(".main-container").css("left", "-450px");
          } else{
            $(".main-container").css("left", "-275px");
          }
					mapComp.resizeMap();
        } else {
          $(".main-container").css("left", "0");
          if($(window).width() > 525){
            $("#mapid").css("width", "calc(100% - 450px)");
            $("#mapid").css("left", "450px");
          } else{
            $("#mapid").css("width", "calc(100% - 275px)");
            $("#mapid").css("left", "275px");
          }
					mapComp.resizeMap();
        }
    }

    mapComp.resizeMap = function(){
      //test text
      google.maps.event.trigger(mapComp.mapid, 'resize')
      if(mapComp.box){
        mapComp.resetBounds();
      } else{
        mapComp.setCenter();
      }
    }

		mapComp.setCenter = function(){
			var center = new google.maps.LatLng(mapComp.mapCenter.lat, mapComp.mapCenter.lng)
			mapComp.mapid.setCenter(center);
		}

    // MAKE SURE CRIME WINDOW IS VALID
    var interval = 0;
    mapComp.delayBeforeSearch = function() {
        $interval.cancel(interval);
        interval = $interval(function() {
            mapComp.checkCrimeWindow();
            $interval.cancel(interval);
            mapComp.getRouteBox();
            mapComp.getCrimes();
        }, 1000);
    };

    mapComp.checkCrimeWindow = function() {
        if (mapComp.crimeWindow > 12) {
            mapComp.crimeWindow = 12;
        } else if (mapComp.crimeWindow < 1) {
            mapComp.crimeWindow = 1;
        }
    }

    mapComp.changeRoute = function(route){
      mapComp.routeIndex = route;
      mapComp.directionsDisplay.setOptions({
        routeIndex: route
      })
    }

    mapComp.isMapLarge = function(){
      if($(window).width() > 625){
        return true;
      } else{
        return false;
      }
    }

    $(window).resize(function(){
      mapComp.toggleControls();
      mapComp.toggleControls();
    });

    // ADD MAP TO SITE
    angular.element(document).ready(function(){
      initMap();
    })

}

MapCompCtrl.$inject = ['$http', '$element', '$interval', '$scope', '$timeout', 'CrimeService']
