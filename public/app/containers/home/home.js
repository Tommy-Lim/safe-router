angular.module('App')
.component('homeComp', {
	templateUrl: 'app/containers/home/home.html',
	controller: HomeCompCtrl,
	controllerAs: 'homeComp'
});

function HomeCompCtrl($http) {
	var homeComp = this;
	homeComp.start = '503 1st Ave W, Seattle';
	homeComp.destination = '1218 3rd Ave, Seattle';
	homeComp.legRanges = [];


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

}

HomeCompCtrl.$inject = ['$http'];
