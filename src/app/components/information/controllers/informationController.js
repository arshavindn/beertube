'use strict';

angular.module('beertube.information').controller('InformationCtrl', ['$scope', 
  function ($scope) {
    $scope.name = "Le Quang Canh";
    $scope.numOfVideo = 8;
    $scope.numOfFV = 10;
    $scope.avatarUrl = "http://corsi.corley.it/angularjs-logo.png";
    $scope.dayJoin = "22/2/2016";
  }]);