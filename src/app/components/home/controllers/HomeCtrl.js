angular.module('beertube.home').controller('HomeCtrl',
  function($scope, $routeParams, Video, User) {
    $scope.page = parseInt($routeParams.page) || 1;
    $scope.nextPage = $scope.page + 1;
    $scope.pageFull = false;
    $scope.loadLimit = 7;
    $scope.pageLimit = 20;
    startIndex = ($scope.page - 1) * $scope.pageLimit;
    $scope.allPosts = [];
    $scope.mostViewedPosts = [];
    Video.all().then(function(response) {
      $scope.allPosts = response.slice(startIndex,
                                       startIndex + $scope.loadLimit);
    });
    $scope.mostViewedPosts = [];
    Video.mostViewed(5).then(function(response) {
      $scope.mostViewedPosts = response;
    });
    $scope.famousUsers = [];
    User.all().then(function (users) {
      users.map(function (user) {
        user.followers().then(function (followers) {
          user.followers = followers;
        });
        user.getUploadVideos().then(function (videos) {
          user.uploadVideos = videos;
        });
      });
      $scope.famousUsers = users.sort(function (user1, user2) {
        return user1.followers.length <= user2.followers.length;
      }).slice(0, 5);
    });
    $scope.loadingPost = false;
    $scope.loadMore = function() {
      var currentNumberOfPosts = $scope.allPosts.length;
      if (currentNumberOfPosts > 0 && !$scope.loadingPost) {
        var totalLoadedPosts = ($scope.page - 1) * $scope.pageLimit + currentNumberOfPosts;
        var numberOfNeededPosts = $scope.loadLimit;
        if (currentNumberOfPosts + $scope.loadLimit > $scope.pageLimit) {
          numberOfNeededPosts = $scope.pageLimit - currentNumberOfPosts;
          $scope.pageFull = true;
        }
        $scope.loadingPost = true;
        Video.all().then(function(response) {
          $scope.loadingPost = false;
          morePosts = response.slice(currentNumberOfPosts,
                                     currentNumberOfPosts + numberOfNeededPosts);
          $scope.allPosts = $scope.allPosts.concat(morePosts);
        });
      }
    };

    $scope.noMorePost = function() {
      return $scope.allPosts.length === 0;
    };
  }
);
