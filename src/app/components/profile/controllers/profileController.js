'use strict';

angular.module('beertube.profile').controller('ProfileCtrl', ['$scope', 'profile', '$routeParams',
  function ($scope, profile, $routeParams) {
  	$scope.userIdParam = $routeParams.userId;
  	$scope.getUser = function (id) {
  	  profile.getUserById(id).then(function (response) {
  	    $scope.user = response.data;
  	  });
  	};
  	$scope.getUser($scope.userIdParam);
    $scope.updateUser = function () {

    };
  }]);