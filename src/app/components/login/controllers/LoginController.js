'use strict';

angular.module('beertube.login').controller('LoginCtrl', ['$scope', '$window', '$cookies', 'login', 'information',
  function ($scope, $window, $cookies, login, information) {
    if ($cookies.get('user_token') === null || $cookies.get('user_token') === undefined) {
      $scope.user = {
          email: '',
          password: ''
      };
      $scope.failLogin = true;
      $scope.login = function () {
        login.loginUser($scope.user).then(function (response) {
          var data = response.data;
          $cookies.put('user_token', data.token);

          login.getUserInfo().then(function (response) {
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
    } else {
      $window.location.href = '#/';
    }
  }]);
