'use strict';

angular.module('beertube.register').controller('RegisterCtrl', ['$scope', '$window', 'register', '$cookies',
  function ($scope, $window, register, $cookies) {
    if ($cookies.get('user_token') == null) {
      $scope.user = {
        email: '',
        fullName: '',
        password: '',
      };
      $scope.userPasswordConfirm = '';
      
      $scope.duplicatePassword = true;
      $scope.duplicateEmail = true;
    
      $scope.createUser = function () {
        if ($scope.user.password === $scope.userPasswordConfirm) {
        	register.createUser($scope.user).then(function (response) {
  	      $window.location.href = '#/login';
  	    }, function (response) {
  	      $scope.duplicateEmail = false;
          $scope.user.password = '';
          $scope.userPasswordConfirm = '';
  	    });
        }
        else {
          $scope.duplicatePassword = false;
          $scope.user.password = '';
          $scope.userPasswordConfirm = '';
        }
      };
    } else {
        $window.location.href = '#/';
      }
  }]);