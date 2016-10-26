angular.module('beertube.home').controller('HomeCtrl', ['$scope', '$routeParams', 'Video',
  function($scope, $routeParams, Video) {
    $scope.page = parseInt($routeParams.page) || 1;
    $scope.nextPage = $scope.page + 1;
    $scope.pageFull = false;
    $scope.loadLimit = 7;
    $scope.pageLimit = 20;
    startIndex = ($scope.page - 1) * $scope.pageLimit;
    $scope.allPosts = Video.all().slice(startIndex,
                                        startIndex + $scope.loadLimit);
    $scope.mostViewedPosts = Video.mostViewed();

    $scope.loadMore = function() {
      currentNumberOfPosts = $scope.allPosts.length;
      if (currentNumberOfPosts > 0) {
        totalLoadedPosts = ($scope.page - 1) * $scope.pageLimit + currentNumberOfPosts;
        if (currentNumberOfPosts + $scope.loadLimit > $scope.pageLimit) {
          numberOfNeededPosts = $scope.pageLimit - currentNumberOfPosts;
          $scope.pageFull = true;
        }
        else {
          numberOfNeededPosts = $scope.loadLimit;
        }
        morePosts = Video.all().slice(currentNumberOfPosts,
                                      currentNumberOfPosts + numberOfNeededPosts);

        $scope.allPosts = $scope.allPosts.concat(morePosts);
      }
    };

    $scope.noMorePost = function() {
      return $scope.allPosts.length == 0;
    }
  }
]);
