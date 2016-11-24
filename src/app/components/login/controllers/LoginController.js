'use strict';

angular.module('beertube.login').controller('LoginCtrl', ['$scope', '$route', '$window', '$cookies', 'login', 'User',
  function ($scope, $route, $window, $cookies, login, User) {
    $scope.user = {
        email: '',
        password: ''
    };
    $scope.failLogin = true;
    $scope.login = function () {
      login.loginUser($scope.user).then(function (response) {
        var data = response.data;
        $cookies.put('user_token', data.token);

        User.getUserInfo().then(function (response) {
          console.log(response.data);
          var userInfo = JSON.stringify(response.data);
          $cookies.put('user_info', userInfo);
          $window.history.back();
        }, function (response) {
          // Do nothing
        });
      }, function (response) {
        $scope.failLogin = false;
        $scope.user.password = '';
      });
    };
  }]);
