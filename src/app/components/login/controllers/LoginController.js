'use strict';

angular.module('beertube.login').controller('LoginCtrl', ['$scope', '$window', '$cookies', 'login',
  function ($scope, $window, $cookies, login) {
    $scope.userStatus = $cookies.get('userStatus');
    $scope.userName = $cookies.get('userName');
    $scope.userId = $cookies.get('userId');
    $scope.user = {
        userEmail: '',
        userPassword: ''
    };
    $scope.login = function () {
      login.loginUser($scope.user).then(function (response) {
        var user = response.data;
        if (user.userId === 0) {
            $scope.user.userEmail = '';
            $scope.user.userPassword = '';
        } else {
            $cookies.put('userId', user.userId);
            $cookies.put('userName', user.userName);
            $cookies.put('userStatus', 'loggedin');
            $window.history.back();  // come back url page
        }
      }, function (response) {
        alert('something wrong');
      });
    };
  }]);
