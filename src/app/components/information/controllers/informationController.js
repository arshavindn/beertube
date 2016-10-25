'use strict';

angular.module('beertube.information').controller('InformationCtrl', ['$scope', 
  function ($scope) {
    $scope.name = "Le Quang Canh";
    $scope.numOfVideo = 8;
    $scope.numOfFV = 10;
  }]);