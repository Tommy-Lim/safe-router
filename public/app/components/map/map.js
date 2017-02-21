angular.module('App').component('mapComp', {
    templateUrl: 'app/components/map/map.html',
    controller: MapCompCtrl,
    controllerAs: 'mapComp'
});

function MapCompCtrl($http, DirectionsServices) {
    var mapComp = this;

    mapComp.initMap = function() {
        mapComp.directionsDisplay;
        mapComp.directionsService = new google.maps.DirectionsService();
        mapComp.directionsDisplay = new google.maps.DirectionsRenderer({draggable: true});

        var latLng = {
            lat: 47.608013,
            lng: -122.335167
        };

        // ADD CURRENT LOCATION AND RE-CENTER MAP
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                console.log(position.coords)
                console.log(position.coords.latitude, position.coords.longitude)
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
                // error getting lat/lng
                makeMap(latLng);
            });
        } else {
            //No browser support geolocation service
            makeMap(latLng);
        }

        function makeMap(latLng) {
            mapComp.mapid = new google.maps.Map(document.getElementById('mapid'), {
                center: latLng,
                zoom: 12
            });

            mapComp.directionsDisplay.setMap(mapComp.mapid);
            mapComp.directionsDisplay.setPanel(document.getElementById('directionsPanel'));

            mapComp.directionsDisplay.addListener('directions_changed', function() {
                // TODO: show or get alternate routes on redraw
                console.log(mapComp.directionsDisplay.getDirections());
            });

            google.maps.event.addListener(mapComp.directionsDisplay, 'routeindex_changed', function() {
                //current routeIndex
                console.log(this.getRouteIndex());
                //current route
                console.log(this.getDirections().routes[this.getRouteIndex()]);
            });
        }

    }

    mapComp.calcRoute = function() {
        var start = '503 1st Ave W, Seattle';
        var end = '1218 3rd Ave, Seattle';

        delay_time = 0 //milliseconds;

        var request = {
            origin: start,
            destination: end,
            travelMode: 'DRIVING',
            avoidTolls: false,
            provideRouteAlternatives: true,
            drivingOptions: {
                departureTime: new Date(new Date().getTime() + delay_time)
            }
        }

        mapComp.directionsService.route(request, function(result, status) {
            if (status == 'OK') {
                mapComp.directionsDisplay.setDirections(result);
                mapComp.result = result;
                console.log(mapComp.result)
                // TODO: take all routes not just [0]
                mapComp.overviewPath = result.routes[0].overview_path
                mapComp.latLngArray = mapComp.overviewPath.map(function(item) {
                    coordinate = {
                        "lat": item.lat(),
                        "lng": item.lng()
                    }
                    return coordinate;
                })
                console.log(mapComp.latLngArray)
            }
        });

    }

    mapComp.addMarkers = function() {
        console.log(mapComp.latLngArray);
        mapComp.latLngArray.forEach(function(coordinate) {
            var latLng = new google.maps.LatLng(coordinate.lat, coordinate.lng);
            var marker = new google.maps.Marker({position: latLng, map: mapComp.mapid})
        })
    }

    mapComp.initMap();

}

MapCompCtrl.$inject = ['$http', 'DirectionsServices']
