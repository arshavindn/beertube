'use strict';

angular.module('beertube.information').controller('InformationCtrl', ['$scope', '$routeParams', 'information', '$cookies', 'favorite',
  function ($scope, $routeParams, information, $cookies, favorite) {
    // Get User Infomation
    information.getUserById($routeParams.userId).then(function(response){
      $scope.user = response.data.data;
      $scope.avatarUrl = $scope.user.avatarUrl || "assets/images/noavatar.jpg";
    }, function(response){
      alert('Cannot find user');
    });
    // Default value
    $scope.videos = [];
    $scope.btnAccess = false;
    information.isFollowing($routeParams.userId).then(function(response){
      var isFollow = response.data.follow;
      $scope.followBtn = !isFollow;
      $scope.unfollowBtn = isFollow;
    }, function(response){
      console.log('fail to connect');
    });
    
    // Get All Video User Uploaded
    information.getAllVideoUserUploaded($routeParams.userId).then(function(response){
      var all_videos = response.data.data;
      $scope.numOfVideo = all_videos.length;
      for (var i=0; i<all_videos.length; i++) {
        $scope.videos.push(all_videos[i]);
      }
    }, function(response){

    });

    // Get Number of Video User Liked
    favorite.getAllVideoUserLiked($routeParams.userId).then(function(response){
      var all_videos = response.data.data;
      $scope.numOfFV = all_videos.length;
    }, function(response){

    });
    
    // Permit edit button
    var userInfo = {};
    if ($cookies.get('user_info') != null) {
      userInfo = JSON.parse($cookies.get('user_info'));
    }
    if ($routeParams.userId == userInfo.userId) {
      $scope.btnAccess = true;
    }

    // Get all following
    information.getAllFollowing($routeParams.userId).then(function(response){
      $scope.all_following = response.data.data;
      $scope.numOfFollowing = $scope.all_following.length;
    }, function(response){
      console.log('not found');
    });

    // Get all followers
    information.getAllFollowers($routeParams.userId).then(function(response){
      $scope.all_followers = response.data.data;
      $scope.numOfFollowers = $scope.all_followers.length;
    }, function(response){
      console.log('not found');
    });

    // Follow User
    $scope.followUser = function () {
      information.followUser($routeParams.userId).then(function(response){
        console.log('success follow');
        $scope.numOfFollowers += 1;
        $scope.followBtn = false;
        $scope.unfollowBtn = true;
      }, function(response){
        console.log('fail follow');
      });
    };

    // Unfollow User
    $scope.unFollowUser = function () {
      information.unFollowUser($routeParams.userId).then(function(response){
        console.log('success');
        $scope.numOfFollowers -= 1;
        $scope.followBtn = true;
        $scope.unfollowBtn = false;
      }, function(response){
        console.log('fail unfollow');
      });
    }

  }]);