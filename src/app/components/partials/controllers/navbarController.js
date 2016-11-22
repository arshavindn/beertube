'use strict';

angular.module('beertube.navbar').controller('NavbarCtrl', ['$scope', '$cookies', '$route',
  function ($scope, $cookies, $route) {
    $scope.userStatus = $cookies.get('userStatus');
    $scope.userName = $cookies.get('userName');
    $scope.userId = $cookies.get('userId');
    $scope.logout = function () {
      $cookies.remove('userStatus');
      $cookies.remove('userName');
      $cookies.remove('userId');
      $route.reload();
    };
}]);