'use strict';

angular.module('beertube.navbar').controller('NavbarCtrl', ['$scope', '$cookies', '$window',
  function ($scope, $cookies, $window) {
    $scope.adminUser = false;
    $scope.isUser = false;
    if ($cookies.get('user_info') != null) {
      var role_arr = JSON.parse($cookies.get('user_info')).role;
      if (role_arr.indexOf('ROLE_ADMIN') != -1) {
        $scope.adminUser = true;
      }
      if (role_arr.indexOf('ROLE_USER') != -1) {
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