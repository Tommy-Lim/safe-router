// CREATE MAP ON LOAD
window.onload = function() {
  console.log("building map...")

    var popup = L.popup();
    var map;
    console.log("DOM loaded and building map")

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

    function geolocationErrorOccurred(geolocationSupported, popup, latLng) {
        popup.setLatLng(latLng);
        popup.setContent(geolocationSupported
            ? '<b>Error:</b> The Geolocation service failed.'
            : '<b>Error:</b> This browser doesn\'t support geolocation.');
        popup.openOn(map);
    }
};
