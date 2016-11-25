'use strict';

angular.module('beertube.navbar').controller('NavbarCtrl', ['$scope', '$cookies', '$window',
  function ($scope, $cookies, $window) {
    if ($cookies.get('user_info') != null ) {
      $scope.userStatus = 'login';
      var userInfo = JSON.parse($cookies.get('user_info'));
      $scope.fullName = userInfo.fullName;
      $scope.userId = userInfo.userId;
    } else {
      $scope.userStatus = '';
    }

    $scope.logout = function () {
      $cookies.remove('user_token');
      $cookies.remove('user_info');
      $window.location.href = '/';
    };
}]);