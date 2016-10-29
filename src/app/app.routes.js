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
      .when('/watch/:id', {
        templateUrl: 'app/components/watch/views/watch.html',
        controller: 'WatchCtrl'
      });
  }])
  .config( function ($httpProvider) {
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
  });
