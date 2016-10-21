angular.module('beertube.home').controller('HomeCtrl', ['$scope', 'Video',
  function($scope, Video) {
      $scope.allPosts = Video.all();
  }
]);
