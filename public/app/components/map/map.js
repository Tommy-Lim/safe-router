angular.module('App')
.component('mapComp', {
  templateUrl: 'app/components/map/map.html',
  controller: MapCompCtrl,
  controllerAs: 'mapCompCtrl'
});

function MapCompCtrl(DirectionsServices){
  var mapComp = this

  DirectionsServices.getDirections();

  window.onload = function() {
		console.log("inside comp JS")

	  var mapLayer = MQ.mapLayer(), map;

	  // CREATE MAP
	  map = L.map('map', {
	    layers: MQ.mapLayer(),
	    center: [ 47.6062, -122.3321 ],
	    zoom: 12
	  });

	  // ADD MAP LAYERS
	  L.control.layers({
	    'Map': mapLayer,
	    'Hybrid': MQ.hybridLayer(),
	    'Satellite': MQ.satelliteLayer(),
	    'Dark': MQ.darkLayer(),
	    'Light': MQ.lightLayer()
	  }).addTo(map);
	};


}

MapCompCtrl.$inject = ['DirectionsServices']
