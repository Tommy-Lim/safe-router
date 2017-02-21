angular.module('App')
.component('homeComp', {
	templateUrl: 'app/containers/home/home.html',
	controller: HomeCompCtrl,
	controllerAs: 'homeComp'
});

function HomeCompCtrl($http, CrimeService) {
	var homeComp = this;
	homeComp.CrimeService = CrimeService;
	homeComp.start = '503 1st Ave W, Seattle';
	homeComp.destination = '1218 3rd Ave, Seattle';
	homeComp.legRanges = [];
	homeComp.routeBoundaries = {};


	homeComp.findRoutes = function() {
		// Reset old results
		homeComp.legRanges = [];

		// Get route result(s) from Mapquest
		if (homeComp.start !== undefined && homeComp.start !== '' && homeComp.destination !== undefined && homeComp.destination !== '') {
			var req = {
				url: 'http://www.mapquestapi.com/directions/v2/route?key=qAylA8byJY9VfeyWnD4LcdGu8Z6UljKv&from=' + homeComp.start + '&to=' + homeComp.destination,
				method: 'GET'
			};

			$http(req).then(function success(res) {
				if (res.data === undefined) {
					homeComp.searchResults = null;
				} else {
					homeComp.searchResults = res.data.route;
					console.log("Search results:", homeComp.searchResults);

					// Create route boundary rectangle
					homeComp.routeBoundaries = {
						latMin: parseFloat(homeComp.searchResults.locations[0].latLng.lat),
						latMax: parseFloat(homeComp.searchResults.locations[1].latLng.lat),
						lngMin: parseFloat(homeComp.searchResults.locations[0].latLng.lng),
						lngMax: parseFloat(homeComp.searchResults.locations[1].latLng.lng)
					};
					if (homeComp.routeBoundaries.latMin > homeComp.routeBoundaries.latMax) {
						var temp = homeComp.routeBoundaries.latMin;
						homeComp.routeBoundaries.latMin = homeComp.routeBoundaries.latMax;
						homeComp.routeBoundaries.latMax = temp;
					}
					if (homeComp.routeBoundaries.lngMin > homeComp.routeBoundaries.lngMax) {
						var temp = homeComp.routeBoundaries.lngMin;
						homeComp.routeBoundaries.lngMin = homeComp.routeBoundaries.lngMax;
						homeComp.routeBoundaries.lngMax = temp;
					}
					console.log("Route boundaries:",homeComp.routeBoundaries);

					// Iterate through legs and find range between each one
					var locations = homeComp.searchResults.locations;
					var maneuvers = homeComp.searchResults.legs[0].maneuvers;
					for (var i=1; i < maneuvers.length; i++) {
						homeComp.legRanges.push(
							{ latRange: {
									begin: parseFloat(maneuvers[i-1].startPoint.lat),
									end: parseFloat(maneuvers[i].startPoint.lat)
								},
								lngRange: {
									begin: parseFloat(maneuvers[i-1].startPoint.lng),
									end: parseFloat(maneuvers[i].startPoint.lng)
								},
							}
						);
					}
					homeComp.legRanges.push(
						{ latRange: {
								begin: parseFloat(maneuvers[maneuvers.length-1].startPoint.lat),
								end: parseFloat(locations[1].latLng.lat)
							},
							lngRange: {
								begin: parseFloat(maneuvers[maneuvers.length-1].startPoint.lng),
								end: parseFloat(locations[1].latLng.lng)
							},
						}
					);
					console.log("Leg ranges:", homeComp.legRanges);

				}
			}, function failure(res) {
				console.log('failed');
			});
		} else {
			homeComp.searchResults = undefined;
		}
		return homeComp.searchResults;
	};

	homeComp.findCrimes = function() {
		console.log(homeComp.CrimeService.getCrimes());
		// var req = {
		// 	url: 'https://data.seattle.gov/resource/pu5n-trf4.json?event_clearance_code=040',
		// 	method: 'GET'
		// };
		// $http(req).then(function success(res) {
		// 	homeComp.crimeResults = [];
		// 	for (var i=0; i<res.data.length; i++) {
		// 		// Only return crimes inside the route boundaries
		// 		if (res.data[i].incident_location.coordinates[0] >= homeComp.routeBoundaries.lngMin && res.data[i].incident_location.coordinates[0] <= homeComp.routeBoundaries.lngMax && res.data[i].incident_location.coordinates[1] >= homeComp.routeBoundaries.latMin && res.data[i].incident_location.coordinates[1] <= homeComp.routeBoundaries.latMax) {
		// 			homeComp.crimeResults.push(res.data[i]);
		// 		}
		// 	}
		// }, function failure(res) {
		// 	console.log('failed');
		// });
		// console.log(homeComp.crimeResults);

		// return homeComp.crimeResults;
	};

}

HomeCompCtrl.$inject = ['$http', 'CrimeService'];
