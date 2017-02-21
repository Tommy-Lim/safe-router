angular.module('App').component('mapComp', {
    templateUrl: 'app/components/map/map.html',
    controller: MapCompCtrl,
    controllerAs: 'mapComp'
});

function MapCompCtrl($http, DirectionsServices) {
    var mapComp = this;
    var mapid;

    DirectionsServices.getDirections();

    mapComp.buildMap = function() {
        // CREATE MAP AFTER LOAD
        // window.onload = function() {
        // CREATE MAP
        mapid = L.map('mapid', {
            layers: MQ.mapLayer(),
            center: [
                47.6062, -122.3321
            ],
            zoom: 13,
            attributionControl: true
        });

        // ADD MAP LAYERS
        // L.control.layers({
        //   'Map': MQ.mapLayer(),
        //   'Hybrid': MQ.hybridLayer(),
        //   'Satellite': MQ.satelliteLayer(),
        //   'Dark': MQ.darkLayer(),
        //   'Light': MQ.lightLayer()
        // }).addTo(map);
        // };
    }

    mapComp.centerOnCurrentLocation = function() {
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
                popup.openOn(mapid);

                mapid.setView(latLng, 13);
            }, function() {
                geolocationErrorOccurred(true, popup, mapid.getCenter());
            });
        } else {
            //No browser support geolocation service
            geolocationErrorOccurred(false, popup, mapid.getCenter());
        }

        // ERROR HANDLER FOR IF GEOLOCATION NOT AVAILABLE
        function geolocationErrorOccurred(geolocationSupported, popup, latLng) {
            popup.setLatLng(latLng);
            popup.setContent(geolocationSupported
                ? '<b>Error:</b> The Geolocation service failed.'
                : '<b>Error:</b> This browser doesn\'t support geolocation.');
            popup.openOn(mapid);
        }
    }

    mapComp.addPoint = function() {
        console.log("adding point");

        // geoJSON object uses lon/lat nomenclature
        var point = {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-122.3299868, 47.6924101]
            },
            "properties": {
                "name": "Point",
                "amenity": "Point type",
                "popupContent": "Point popup text"
            }
        };

        function onEachFeature(feature, layer) {
            // does this feature have a property named popupContent?
            if (feature.properties && feature.properties.popupContent) {
                layer.bindPopup(feature.properties.popupContent);
            }
        }

        L.geoJSON(point, {onEachFeature: onEachFeature}).addTo(mapid);
        // var pointsLayer = L.geoJSON().addTo(map);
        // pointsLayer.addData(point);
    }

    mapComp.addPoints = function() {
        var points = [
            {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [-122.3299868, 47.6824101]
                },
                "properties": {
                    "name": "Point",
                    "amenity": "Point",
                    "popupContent": "Point text"
                }
            }, {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [-122.3399868, 47.6824101]
                },
                "properties": {
                    "name": "Point",
                    "amenity": "Point",
                    "popupContent": "Point popup text"
                }
            }, {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [-122.3499868, 47.6824101]
                },
                "properties": {
                    "name": "Point",
                    "amenity": "Point",
                    "popupContent": "Point popup text"
                }
            }
        ]

        function onEachFeature(feature, layer) {
            // does this feature have a property named popupContent?
            if (feature.properties && feature.properties.popupContent) {
                layer.bindPopup(feature.properties.popupContent);
            }
        }

        L.geoJSON(points, {onEachFeature: onEachFeature}).addTo(mapid);

        // var layer = L.geoJSON().addTo(mapid);
        // layer.addData(points);

    }

    mapComp.addMarker = function() {
        var marker = L.marker([47.6724101, -122.3399868]).addTo(mapid);
        marker.bindPopup("Home")
    }

    mapComp.addPopup = function() {
        var popup = L.popup().setLatLng([47.6624101, -122.3499868]).setContent("Stand alone Home.").openOn(mapid);
    }

    mapComp.addIcon = function() {
        var greenIcon = L.icon({
            iconUrl: 'img/leaf-green.png',
            shadowUrl: 'img/leaf-shadow.png',
            iconSize: [
                38, 95
            ], // size of the icon
            shadowSize: [
                50, 64
            ], // size of the shadow
            iconAnchor: [
                22, 94
            ], // point of the icon which will correspond to marker's location
            shadowAnchor: [
                4, 62
            ], // the same for the shadow
            popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
        });

        L.marker([
            47.6524101, -122.3399868
        ], {icon: greenIcon}).addTo(mapid);

    }

    mapComp.addLayerGroup = function() {
        var one = L.marker([47.66, -122.34]).bindPopup('Point 1');
        var two = L.marker([47.67, -122.34]).bindPopup('Point 2');
        var three = L.marker([47.68, -122.34]).bindPopup('Point 3');

        var points = L.layerGroup([one, two, three]);

        baseLayers = {
            'Map': MQ.mapLayer(),
            'Hybrid': MQ.hybridLayer(),
            'Satellite': MQ.satelliteLayer(),
            'Dark': MQ.darkLayer(),
            'Light': MQ.lightLayer()
        }

        var overlayMaps = {
            "Points": points
        }

        L.control.layers(baseLayers, overlayMaps).addTo(mapid);
    }

    mapComp.findRoute = function() {
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}{r}.png', {attribution: '© OpenStreetMap contributors'}).addTo(mapid);

        var route = L.Routing.control({
            waypoints: [
                L.latLng(47.66, -122.34),
                L.latLng(47.71, -122.249)
            ],
            showAlternatives: true
        }).addTo(mapid);

        console.log("WAYPOINTS:", route.getWaypoints());
        console.log("PLAN:", route.getPlan());
        console.log("ROUTER:", route.getRouter());
        console.log("ROUTE:", route);

    }

    mapComp.createGMap = function(){
      var directionsDisplay;
      var directionsService = new google.maps.DirectionsService();

      function initMap() {
        directionsDisplay = new google.maps.DirectionsRenderer({ draggable: true});

        mapid = new google.maps.Map(document.getElementById('mapid'), {
          center: {lat: 47.608, lng: -122.354},
          zoom: 12
        });

        directionsDisplay.setMap(mapid);
        directionsDisplay.setPanel(document.getElementById('directionsPanel'));

        directionsDisplay.addListener('directions_changed', function() {
          console.log(directionsDisplay.getDirections());
        });
      }

      function calcRoute(){
        var start = '503 1st Ave W, Seattle';
        var end = 'Green lake, Seattle';

        // REQUEST PARAMS:
        // {
        //   origin: LatLng | String | google.maps.Place,
        //   destination: LatLng | String | google.maps.Place,
        //   travelMode: TravelMode,
        //   transitOptions: {
              //   arrivalTime: Date,
              //   departureTime: Date,
              //   modes[]: TransitMode,
              //   routingPreference: TransitRoutePreference
              // },
        //   drivingOptions: {
              //   departureTime: Date,
              //   trafficModel: TrafficModel
              // },
        //   unitSystem: UnitSystem,
        //   waypoints[]: DirectionsWaypoint,
        //   optimizeWaypoints: Boolean,
        //   provideRouteAlternatives: Boolean,
        //   avoidHighways: Boolean,
        //   avoidTolls: Boolean,
        //   region: String
        // }

        var request = {
          origin: start,
          destination: end,
          travelMode: 'DRIVING',
          avoidTolls: false,
          provideRouteAlternatives: true,
          drivingOptions: {
            departureTime: new Date()
          }
        }

        directionsService.route(request, function(result, status) {
          if (status == 'OK') {
            directionsDisplay.setDirections(result);
            mapComp.result = result;
            console.log(mapComp.result)
            mapComp.overviewPath = result.routes[0].overview_path
            mapComp.latLngArray = mapComp.overviewPath.map(function(item){
              coordinate = {
                "lat":item.lat(),
                "lng": item.lng()
              }
              return coordinate;
            })
            console.log(mapComp.latLngArray)
          }
        });

      }

      initMap();
      calcRoute();

    }

    // mapComp.buildMap();
    // mapComp.centerOnCurrentLocation();

}

MapCompCtrl.$inject = ['$http', 'DirectionsServices']
