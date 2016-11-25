'use strict';

angular.module('beertube.favorite').controller('FavoriteCtrl', ['$scope', 'favorite', '$routeParams',
  function ($scope, favorite, $routeParams) {
    favorite.getAllVideoUserLiked($routeParams.userId).then(function(response){
      $scope.videos = response.data.data;
    }, function(response){
      alert('Not found');
    });
  }]);