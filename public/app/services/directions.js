angular.module('App')
.service('DirectionsServices', DirectionsServices);

function DirectionsServices($http){

  this.getDirections = function(){
    console.log("service linked up");
  }


}

DirectionsServices.$inject = ['$http'];
