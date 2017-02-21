angular.module('App').component('mapComp', {
    templateUrl: 'app/components/map/map.html',
    controller: MapCompCtrl,
    controllerAs: 'mapCompCtrl'
});

function MapCompCtrl($http, DirectionsServices) {
    var mapComp = this

    DirectionsServices.getDirections();

}

MapCompCtrl.$inject = ['$http', 'DirectionsServices']
