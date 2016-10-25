'use strict';

angular.module('beertube.upload').controller('UploadCtrl', ['$scope',
  function ($scope) {
    $scope.video = {
      videoId: 0,
      videoName: "",
      videoUrl: "",
      videoDes: "",
      videoImageUrl: ""
    }
    $scope.videoLink = "";
    $scope.uploadVideo = function () {

    }
    $scope.viewDemo = function () {
      var str = $scope.videoLink.split("watch?v=");
      $scope.video.videoUrl = "https://www.youtube.com/embed/" + str[1];
      $scope.video.videoImageUrl = "http://img.youtube.com/vi/" + str[1] + "/mqdefault.jpg";
    }
  }]);