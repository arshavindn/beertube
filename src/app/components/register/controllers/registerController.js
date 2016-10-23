'use strict';

angular.module('beertube.register').controller('RegisterCtrl', ['$scope', '$location', 'register', '$cookies',
  function ($scope, $location, register, $cookies) {
    $scope.user = {
      userEmail: '',
      userName: '',
      userPassword: '',
    };
    $scope.userPasswordConfirm = '';
    $scope.createUser = function () {
      if ($scope.user.userPassword === $scope.userPasswordConfirm) {
      	register.createUser($scope.user).then(function (response) {
      	var user = response.data;
	      $cookies.put('userId', user.userId);
	      $cookies.put('userName', user.userName);
	      $cookies.put('userStatus', 'login');
	      $location.path('/');
	    }, function (response) {
	      alert('something wrong');
	    });
      }
      else {
        alert('Password was wrong');
      }
      
    };
  }]);