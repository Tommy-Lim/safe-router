angular.module('App')
.service('CrimeService', CrimeService);

function CrimeService($http) {
	this.getCrimes = function() {
		console.log('crime service hooked up')

		var routeBoundaries = {
			lat: {
				south: 47.606,
				north: 47.635
			},
			lng: {
				west: -122.359,
				east: -122.321
			}
		}

		var query = encodeURIComponent(JSON.stringify(routeBoundaries));
		console.log("query:", query)

		var req = {
			url: '/api/data/' + query,
			method: 'GET'
		};
		$http(req).then(function success(res) {
			// homeComp.crimeResults = [];
			// for (var i=0; i<res.data.length; i++) {
			// 	// Only return crimes inside the route boundaries
			// 	if (res.data[i].incident_location.coordinates[0] >= homeComp.routeBoundaries.lngMin && res.data[i].incident_location.coordinates[0] <= homeComp.routeBoundaries.lngMax && res.data[i].incident_location.coordinates[1] >= homeComp.routeBoundaries.latMin && res.data[i].incident_location.coordinates[1] <= homeComp.routeBoundaries.latMax) {
			// 		homeComp.crimeResults.push(res.data[i]);
			// 	}
			// }
			console.log(res)
			console.log("route boundaries:", routeBoundaries)
			return res
		}, function failure(res) {
			console.log('failed', res);
		});
	}
}

CrimeService.$inject = ['$http'];