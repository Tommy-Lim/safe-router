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

function MapCompCtrl($http, DirectionsServices, CrimeService, $interval) {
    var mapComp = this;
    mapComp.CrimeService = CrimeService;
    mapComp.start = '503 1st Ave W, Seattle';
  	mapComp.end = '1218 3rd Ave, Seattle';
		mapComp.sensitivity = 3;
		mapComp.padding = 0.003;
  	mapComp.crimeWindow = 12;

    // INITILAIZE MAP
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

        // MAKE MAP FUNCTION TO BE USED ABOVE
        function makeMap(latLng) {
            // CREATE GOOGLE MAP WITH LAT/LNG
            mapComp.mapid = new google.maps.Map(document.getElementById('mapid'), {
                center: latLng,
                zoom: 14
            });

            mapComp.trafficLayer = new google.maps.TrafficLayer();
            mapComp.trafficLayer.setMap(mapComp.mapid);

            // SET THE DIRECTIONS DISPLAY TO BE ON THE MAP AND ASSIGN THE DIRECTIONS TEXT TO DIRECTIONS PANEL
            mapComp.directionsDisplay.setMap(mapComp.mapid);
            mapComp.directionsDisplay.setPanel(document.getElementById('directionsPanel'));

            // WHEN ROUTE IS DRAGGED OR CHANGED, RETURN DIRECTIONS
            mapComp.directionsDisplay.addListener('directions_changed', function() {
                // TODO: show or get alternate routes on redraw
                var newDirections = mapComp.directionsDisplay.getDirections()
                // console.log("DIRECTIONS AFTER CHANGE ROUTE", newDirections);
                mapComp.latLngArray = mapScope.polylinesToLatLngArr(newDirections.routes)
                // console.log("LAT/LNG AFTER CHANGING ROUTE: ", mapComp.latLngArray)
            });

            // WHEN ROUTE OPTION IS CHANGED, RETURN DIRECTIONS
            google.maps.event.addListener(mapComp.directionsDisplay, 'routeindex_changed', function() {
                // mapScope.removeMarkers();
                mapScope.removeBox();
                // CURRENT ROUTE INDEX
                // console.log("SELECTED ROUTE INDEX: ", this.getRouteIndex());
                //CURRENT ROUTE
                newRoutes = this.getDirections().routes
                // console.log("SELECTED ROUTE: ", newRoutes);
                mapComp.latLngArray = mapScope.polylinesToLatLngArr(newRoutes)
                // mapScope.addMarkers();
                mapScope.getRouteBox();
                mapScope.getCrimes();
            });
        }

    }

    // CALCULATE ROUTE
    mapComp.calcRoute = function(start, end, delay) {
        // SET DEFAULTS
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

        // SETUP DIRECTIONS REQUEST OBJECT
        var request = {
            origin: start,
            destination: end,
            travelMode: 'DRIVING',
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
                // console.log("DIRECTIONS RESULT: ", mapComp.directionsResult)
                mapComp.overviewPath = mapComp.directionsResult.routes[0].overview_path
                mapComp.latLngArray = mapScope.polylinesToLatLngArr(mapComp.directionsResult.routes);
                // console.log("LAT/LNG DIRECTIONS RESULT: ", mapComp.latLngArray)
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
        return coordinateArrs;
    }

    //ADD LA/LNG MARKERS FOR THE CURRENT ROUTE
    mapComp.addMarkers = function() {
        var index = mapComp.directionsDisplay.getRouteIndex()
        // console.log("ROUTE INDEX: ", index);
        mapComp.markers = [];
        // console.log("ROUTES ARRAY: ", mapComp.latLngArray);
        console.log("CURRENT ROUTES ARRAY TO ADD MARKERS TO: ", mapComp.latLngArray[index]);
        mapComp.latLngArray[index].forEach(function(coordinate) {
            var latLng = new google.maps.LatLng(coordinate.lat, coordinate.lng);
            var marker = new google.maps.Marker({position: latLng, map: mapComp.mapid})
            mapComp.markers.push(marker);
        })
    }

    // REMOVE LAT/LNG MARKERS FOR CURRENT ROUTE
    mapComp.removeMarkers = function() {
        if (mapComp.markers && mapComp.markers.length > 0) {
            mapComp.markers.forEach(function(marker) {
                marker.setMap(null);
            })
        }
    }

    // ADD BOX ZONE FOR CURRENT ROUTE
    mapComp.getRouteBox = function(padding){
      // SET PADDING FOR BOX
      if(mapComp.padding == 0){
        padding = 0.000; //degree lat/lng
			} else if(!mapComp.padding){
				padding = 0.005;
      } else{
				padding = mapComp.padding;
			}

      //GET ROUTE DETAILS
      var index = mapComp.directionsDisplay.getRouteIndex();
      var firstCoord = mapComp.latLngArray[index][0];

      // SET DEFAULTS FOR BOX
      mapComp.box = {
        lat:{
          south: firstCoord.lat,
          north: firstCoord.lat
        },
        lng: {
          west: firstCoord.lng,
          east: firstCoord.lng
        }
      }

      // FIND MIN/MAX FOR LAT/LNG
      mapComp.latLngArray[index].forEach(function(coordinate) {
          if(coordinate.lat > mapComp.box.lat.north){
            mapComp.box.lat.north = coordinate.lat;
          }
          if(coordinate.lat < mapComp.box.lat.south){
            mapComp.box.lat.south = coordinate.lat;
          }
          if(coordinate.lng > mapComp.box.lng.east){
            mapComp.box.lng.east = coordinate.lng;
          }
          if(coordinate.lng < mapComp.box.lng.west){
            mapComp.box.lng.west = coordinate.lng;
          }
      })

      // ADD PADDING TO ZONE
      mapComp.box.lat.south -= padding;
      mapComp.box.lat.north += padding;
      mapComp.box.lng.east += 1.75*padding;
      mapComp.box.lng.west -= 1.75*padding;

      // BUILD LAT/LNG COORDINATE OBJECT FOR POLYGON
      mapComp.boxCoordinates = [
          {lat: mapComp.box.lat.north, lng: mapComp.box.lng.west},
          {lat: mapComp.box.lat.north, lng: mapComp.box.lng.east},
          {lat: mapComp.box.lat.south, lng: mapComp.box.lng.east},
          {lat: mapComp.box.lat.south, lng: mapComp.box.lng.west}
      ]

      // BUILD BOX POLYGON
      mapComp.mapBox = new google.maps.Polygon({
        paths: mapComp.boxCoordinates,
        strokeColor: '#EE0000',
        strokeOpacity: 0.3,
        fillColor: '#EE0000',
        fillOpacity: 0.00,
      })

      // SET POLYGON TO MAP
      mapComp.mapBox.setMap(mapComp.mapid)

    }

    // REMOVE POLYGON FROM MAP
    mapComp.removeBox = function(){
      if(mapComp.mapBox){
        mapComp.mapBox.setMap(null)
      }
    }

    mapComp.getCrimes = function(){
      mapScope = this;
      var crimes = mapComp.CrimeService.getCrimes(mapComp.box).then(function(data){
        console.log("CRIMES: ", data.result);
        mapComp.crimes = data.result;

				// FILTER RESULTS BASED ON USER SETTINGS
				var currentTime = new Date();
				var currentHour = currentTime.getHours();

				for (var i=mapComp.crimes.length-1; i>=0; i--) {

					// By Crime Window
					var crimeTime = mapComp.crimes[i].event_clearance_date;

					if (crimeTime === undefined) {
						mapComp.crimes.splice(i, 1);
					}
					else if (crimeTime) {
						var crimeHour = parseInt(crimeTime.split(' ')[1].split(':')[0],10);
						var checkedTime = checkTime(currentHour, parseInt(mapComp.crimeWindow,10), crimeHour);

						if (checkedTime === false) {
							mapComp.crimes.splice(i, 1);
						}
						else {
							checkCrimeFilter(i);
						}
						
						function checkTime(hour, spread, query ){
						  if(hour + spread > 24){
						    min1 = hour - spread;
						    max1 = 24;
						    min2 = 0;
						    max2 = hour + spread - 24;
						    // console.log("range is", min2, "to", max2, "and", min1, "to", max1)
						    if (checkHour(query, min1, max1) || checkHour(query, min2, max2)){
						      return true
						    } else{
						      return false
						    }
						    
						  } else if(hour - spread < 0){
						    min1 = 0;
						    max1 = hour + spread;
						    min2 = 24 - (spread - hour);
						    max2 = 24;
						    // console.log("range is", min2, "to", max2, "and", min1, "to", max1)
						    if(checkHour(query, min1, max1) || checkHour(query, min2, max2)) {
						      return true
						    } else{
						      return false
						    }
						  } else{
						    min = hour - spread;
						    max = hour + spread;
						    // console.log("spread is", min, "to", max)
						    if(checkHour(query, min, max)){
						      return true
						    } else {
						      return false
						    }
						  }
						}

						function checkHour(crimeHour, min, max) {
						  if(crimeHour >= min && crimeHour <= max) {
						    return true
						  } else {
						    return false;
						  }
						}

						function checkCrimeFilter(i) {
							if (document.getElementById('filter-crime-physical').checked === false &&
								mapComp.crimes[i].event_clearance_code === 10 ||
								mapComp.crimes[i].event_clearance_code === 31 ||
								mapComp.crimes[i].event_clearance_code === 40 ||
								mapComp.crimes[i].event_clearance_code === 43 ||
								mapComp.crimes[i].event_clearance_code === 49 ) {
								mapComp.crimes.splice(i, 1);
							}
							else if (document.getElementById('filter-crime-vehicle').checked === false &&
								mapComp.crimes[i].event_clearance_code === 30 ||
								mapComp.crimes[i].event_clearance_code === 63 ||
								mapComp.crimes[i].event_clearance_code === 71 ) {
								mapComp.crimes.splice(i, 1);
							}
							else if (document.getElementById('filter-crime-weapon').checked === false &&
								mapComp.crimes[i].event_clearance_code === 291 ||
								mapComp.crimes[i].event_clearance_code === 292 ) {
								mapComp.crimes.splice(i, 1);
							}
							else if (document.getElementById('filter-crime-jerk').checked === false &&
								mapComp.crimes[i].event_clearance_code === 41 ) {
								mapComp.crimes.splice(i, 1);
							}
						}


					}
					
				}

				console.log("FILTERED CRIMES: ", mapComp.crimes);

        mapScope.plotCrimes();
        mapScope.findMatches();
      });
    }

    mapComp.plotCrimes = function(){
      var heatMapData = [];

      // ADD HEAT MAP DATA
      mapComp.crimes.forEach(function(crime){
        heatMapData.push(new google.maps.LatLng(parseFloat(crime.latitude), parseFloat(crime.longitude)));
      })

      // CREATE NEW HEAT MAP IF DOES NOT EXIST
			if (true) {
				// DISASSOCIATE CURRENT HEATMAP
				if(mapComp.heatMap && mapComp.heatMap.getMap()){
					mapComp.heatMap.setMap(null);
				}
				// REWRITE HEATMAP LAYER
				mapComp.heatMap = new google.maps.visualization.HeatmapLayer({
					data: heatMapData,
					radius: 15
				})
				// SET HEATMAP TO MAP
				mapComp.heatMap.setMap(mapComp.mapid);
			} else if(!mapComp.heatMapCreated){
				// CREATE FIRST HEATMAP
				mapComp.heatMap = new google.maps.visualization.HeatmapLayer({
					data: heatMapData,
					radius: 15
				})
				// SET FIRST HEATMAP TO MAP
				mapComp.heatMap.setMap(mapComp.mapid);
				// FLIP BOOLEAN OF HEATMAP EVER CREATED
				mapComp.heatMapCreated = true;
      } else{
				// console.log("RESET MAP DATA with: ", heatMapData)
				// mapComp.heatMap.set('data', heatMapData);
      }

    }

    mapComp.toggleHeatmap = function(){
			if(mapComp.heatMap){
				if(mapComp.heatMap.getMap()){
					mapComp.heatMap.setMap(null);
					// mapComp.heatMapCreated = false;
				} else{
					mapComp.heatMap.setMap(mapComp.mapid);
				}
			}
    }

		mapComp.toggleBorder = function(){
			if(mapComp.mapBox){
				if(mapComp.mapBox.getMap()){
					mapComp.mapBox.setMap(null);
					// mapComp.heatMapCreated = false;
				} else{
					mapComp.mapBox.setMap(mapComp.mapid);
				}
			}
		}

		mapComp.toggleTraffic = function(){
			if(mapComp.trafficLayer){
				if(mapComp.trafficLayer.getMap()){
					mapComp.trafficLayer.setMap(null);
					// mapComp.heatMapCreated = false;
				} else{
					mapComp.trafficLayer.setMap(mapComp.mapid);
				}
			}
		}

    mapComp.findMatches = function(){
			var sensitivity;
			if(!mapComp.sensitivity){
				sensitivity = 3;
			} else{
				sensitivity = mapComp.sensitivity;
			}

      routes = mapComp.latLngArray;
      crimes = mapComp.crimes;

      // ROUND CRIMES TO THOUSANDTHS < 500FT
      crimes.forEach(function(crime){
        crime.lat = parseFloat(crime.latitude.toFixed(sensitivity));
        crime.lng = parseFloat(crime.longitude.toFixed(sensitivity));
      })

      // DECLARE COUNTED CRIMES
      mapComp.countedCrimes = [[],[],[],[]];

      // ITERATE THROUGH EACH ROUTE AND COORDINATE
      routes.forEach(function(route, index){
        route.forEach(function(coordinate){
          // ROUND COORDINATES TO THOUSANDTHS < 500 FT
          coordinate.lat = parseFloat(coordinate.lat.toFixed(sensitivity));
          coordinate.lng = parseFloat(coordinate.lng.toFixed(sensitivity));
          // CHECK IF MATCHING CRIMES
          crimes.forEach(function(crime){
            // ADD TO COUNTED CRIMES IF MATCHING
            if(crime.lat == coordinate.lat && crime.lng == coordinate.lng){
              mapComp.countedCrimes[index].push(crime);
            }
          })
        })
      })
      console.log("COUNTED CRIMES: ", mapComp.countedCrimes);

    }

		// ADD MAP TO SITE
		mapComp.initMap();

		// TOGGLE CHECKBOXES
		mapComp.checkBox = function() {
			console.log(this);
			if ($(event.currentTarget).attr("checked")) {
				$(event.currentTarget).removeAttr("checked");
			} else {
				console.log(event.currentTarget)
				$(event.currentTarget).attr("checked", true);
			}
		}

		// MAKE SURE CRIME WINDOW IS VALID
		var interval = 0;
		mapComp.delayBeforeSearch = function() {
		    $interval.cancel(interval);
		    interval = $interval(function() {
		        mapComp.checkCrimeWindow();
		        $interval.cancel(interval);
		    }, 0);
		};
		mapComp.checkCrimeWindow = function() {
			if (mapComp.crimeWindow > 12) {
				mapComp.crimeWindow = 12;
			} else if (mapComp.crimeWindow < 1) {
				mapComp.crimeWindow = 1;
			} 
		}

}

MapCompCtrl.$inject = ['$http', 'DirectionsServices', 'CrimeService', '$interval']
