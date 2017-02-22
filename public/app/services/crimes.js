angular.module('App')
.service('CrimeService', CrimeService);

function CrimeService($http) {
	this.getCrimes = function(routeBoundaries) {

		var query = encodeURIComponent(JSON.stringify(routeBoundaries));
		// console.log("query:", query)

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
