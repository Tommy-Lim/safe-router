angular.module('App')
.service('CrimeService', CrimeService);

function CrimeService($http) {
	this.getCrimes = function(routeBoundaries, codes) {
		data = {};
		data.boundaries = routeBoundaries;
		data.codes = codes;
		var query = encodeURIComponent(JSON.stringify(data));

		var req = {
			url: '/api/data/' + query,
			method: 'GET'
		};
		return $http(req).then(function success(res) {
			return res.data
		}, function failure(res) {
			// console.log('failed', res);
		});
	}
}

CrimeService.$inject = ['$http'];
