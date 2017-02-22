angular.module('App')
.service('CrimeService', CrimeService);

function CrimeService($http) {
	this.getCrimes = function(routeBoundaries) {

		// var routeBoundaries = {
		// 	lat: {
		// 		south: 47.6063,
		// 		north: 47.62446
		// 	},
		// 	lng: {
		// 		west: -122.359,
		// 		east: -122.3348
		// 	}
		// }
		console.log("CRIME BOX SERVICE:", routeBoundaries);

		var query = encodeURIComponent(JSON.stringify(routeBoundaries));
		// console.log("query:", query)

		var req = {
			url: '/api/data/' + query,
			method: 'GET'
		};
		return $http(req).then(function success(res) {
			// homeComp.crimeResults = [];
			// for (var i=0; i<res.data.length; i++) {
			// 	// Only return crimes inside the route boundaries
			// 	if (res.data[i].incident_location.coordinates[0] >= homeComp.routeBoundaries.lngMin && res.data[i].incident_location.coordinates[0] <= homeComp.routeBoundaries.lngMax && res.data[i].incident_location.coordinates[1] >= homeComp.routeBoundaries.latMin && res.data[i].incident_location.coordinates[1] <= homeComp.routeBoundaries.latMax) {
			// 		homeComp.crimeResults.push(res.data[i]);
			// 	}
			// }
			// console.log("RES.data.rsult:", res.data)
			// console.log("route boundaries:", routeBoundaries)
			return res.data
		}, function failure(res) {
			// console.log('failed', res);
		});
	}
}

CrimeService.$inject = ['$http'];
