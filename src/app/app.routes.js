angular.module('beertube')
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        controller: 'HomeCtrl',
        templateUrl: 'app/components/home/views/home.html',
      })
      .when('/login', {
      	templateUrl: 'app/components/login/views/login.html',
      	controller: 'LoginCtrl'
      })
      .when('/register', {
        templateUrl: 'app/components/register/views/register.html',
        controller: 'RegisterCtrl'
      })
      .when('/user/:userId/profile', {
        templateUrl: 'app/components/profile/views/profile.html',
        controller: 'ProfileCtrl'
      })
      .when('/user/:userId/password', {
        templateUrl: 'app/components/password/views/password.html',
        controller: 'PasswordCtrl'
      });
  }]);
