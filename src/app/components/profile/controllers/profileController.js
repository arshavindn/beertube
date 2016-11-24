'use strict';

angular.module('beertube.profile').controller('ProfileCtrl', ['$scope', 'profile', '$cookies', '$window',
  function ($scope, profile, $cookies, $window) {
    var userInfo = JSON.parse($cookies.get('user_info'));
    $scope.user = {
      email: userInfo.email,
      fullName: userInfo.fullName,
      avatarUrl: userInfo.avatarUrl
    };
    $scope.sUpdate = true;
    $scope.fUpdate = true;

    $scope.updateUser = function () {
      profile.updateUser($scope.user).then(function (response) {
        var newUserInfo = JSON.stringify(response.data.data);
        $cookies.remove('user_info');
        $cookies.put('user_info', newUserInfo);
        $scope.sUpdate = false;
      }, function (response) {
        $scope.fUpdate = false;
      });
    };
  }]);