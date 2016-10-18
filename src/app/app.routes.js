angular.module('beertube', [
	'ngRoute',
	'loginController',
	'loginService'])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/components/home/views/home.html',
      })
      .when('/login', {
      	templateUrl: 'app/components/login/views/login.html',
      	controller: 'LoginController'
      });
  }]);
