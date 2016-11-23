'use strict';

angular.module('beertube.register').controller('RegisterCtrl', ['$scope', '$location', 'register',
  function ($scope, $location, register) {
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
	      $location.path('/login');
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
  }]);