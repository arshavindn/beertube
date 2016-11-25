'use strict';

angular.module('beertube.information').controller('InformationCtrl', ['$scope', '$routeParams', 'information', '$cookies',
  function ($scope, $routeParams, information, $cookies) {
    information.getUserById($routeParams.userId).then(function(response){
      var user = response.data.data;
      $scope.name = user.fullName;
      $scope.dayJoin = user.createAt;
      $scope.avatarUrl = user.avatarUrl || "assets/images/noavatar.jpg";
    }, function(response){
      alert('Cannot find user');
    });
    $scope.numOfVideo = 8;
    $scope.numOfFV = 10;
    $scope.videos = [];
    $scope.btnAccess = false;
    
    information.getAllVideoUserUploaded($routeParams.userId).then(function(response){
      var all_videos = response.data.data;
      for (var i=0; i<all_videos.length; i++) {
        $scope.videos.push(all_videos[i]);
      }
    }, function(response){

    });

    var userInfo = {};
    if ($cookies.get('user_info') != null) {
      userInfo = JSON.parse($cookies.get('user_info'));
    }
    if ($routeParams.userId == userInfo.userId) {
      $scope.btnAccess = true;
    }

  }]);