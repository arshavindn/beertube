angular.module('beertube', ['ngRoute'])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/components/home/views/home.html',
      });
  }]);
