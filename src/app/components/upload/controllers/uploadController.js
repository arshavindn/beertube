'use strict';

angular.module('beertube.upload').controller('UploadCtrl', ['$scope', 'upload',
  function ($scope, upload) {
    $scope.video = {
      videoName: "",
      category: {categoryId: ""},
      videoUrl: "",
      description: "",
      videoImage: "",
      videoCode: ""
    }
    $scope.fVideo = true;
    $scope.sVideo = true;
    $scope.categories = {};

    upload.getAllCategories().then(function(response){
      var data_arr = response.data.data;
      for(var i=0; i<data_arr.length; i++) {
        var name = data_arr[i].categoryName;
        var id = data_arr[i].categoryId;
        $scope.categories[name] = id;
      }
    }, function(response){

    });
    $scope.viewDemo = function () {
      var str = $scope.videoLink.split("watch?v=");
      $scope.video.videoCode = str[1];
      $scope.video.videoUrl = "https://www.youtube.com/embed/" + str[1];
      $scope.video.videoImage = "http://img.youtube.com/vi/" + str[1] + "/mqdefault.jpg";
    }

    $scope.uploadVideo = function () {
      upload.createVideo($scope.video).then(function(response){
        $scope.sVideo = false;
      }, function(response){
        $scope.fVideo = false;
      });
    }
  }]);