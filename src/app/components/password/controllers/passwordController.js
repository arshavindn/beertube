'use strict';

angular.module('beertube.password').controller('PasswordCtrl', ['$scope', 
  function ($scope) {
    $scope.oldPassword = "";
    $scope.newPassword = "";
    $scope.confirmPassword = "";
  }]);