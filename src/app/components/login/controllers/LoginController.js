'use strict';

angular.module('beertube.login').controller('LoginCtrl', ['$scope', '$window', '$cookies', 'login',
  function ($scope, $window, $cookies, login) {
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
            window.alert("Incorrect Email or Password");
        } else {
            $cookies.put('userId', user.userId);
            $cookies.put('userName', user.userName);
            $cookies.put('userStatus', 'login');
            $window.history.back();  // come back url page
        }
      }, function (response) {
        alert('something wrong');
      });
    };
  }]);
