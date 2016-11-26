'use strict';

angular.module('beertube.navbar').controller('NavbarCtrl', ['$scope', '$cookies', '$window',
  function ($scope, $cookies, $window) {
    $scope.adminUser = false;
    $scope.isUser = false;
    if ($cookies.get('user_info') != null) {
      if (JSON.parse($cookies.get('user_info')).role[1] == 'ROLE_ADMIN') {
        $scope.adminUser = true;
      }
      if (JSON.parse($cookies.get('user_info')).role[0] == 'ROLE_USER') {
        $scope.isUser = true;
        var userInfo = JSON.parse($cookies.get('user_info'));
        $scope.fullName = userInfo.fullName;
        $scope.userId = userInfo.userId;
      }
    } else {
      $scope.isUser = false;
    }

    $scope.logout = function () {
      $cookies.remove('user_token');
      $cookies.remove('user_info');
      $window.location.href = '/';
    };
}]);