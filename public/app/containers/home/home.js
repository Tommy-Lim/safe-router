angular.module('App')
.component('homeComp', {
	templateUrl: 'app/containers/home/home.html',
	controller: HomeCompCtrl,
	controllerAs: 'homeComp'
});

function HomeCompCtrl($http) {
	var homeComp = this;
	homeComp.start = '503 1st ave w, seattle';
	homeComp.destination = '1218 3rd Ave, Seattle';


	homeComp.findRoutes = function() {

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
					console.log(homeComp.searchResults)
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
