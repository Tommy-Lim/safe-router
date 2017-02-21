angular.module('App')
.component('homeComp', {
	templateUrl: 'app/containers/home/home.html',
	controller: HomeCompCtrl,
	controllerAs: 'homeComp'
});

function HomeCompCtrl($http, CrimeService) {
	var homeComp = this;
	homeComp.CrimeService = CrimeService;

	homeComp.findCrimes = function() {
		console.log(homeComp.CrimeService.getCrimes());

	};

}

HomeCompCtrl.$inject = ['$http', 'CrimeService'];
