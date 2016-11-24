'use strict';

angular.module('beertube.videoUpdate').controller('VideoUpdateCtrl', ['$scope', 'videoUpdate', '$routeParams', 'upload',
  function($scope, videoUpdate, $routeParams, upload) {
  	// Default value for some variable
  	$scope.fVideo = true;
    $scope.sVideo = true;
    $scope.categories = {};

    // Load value for category select
    upload.getAllCategories().then(function(response){
      var data_arr = response.data.data;
      for(var i=0; i<data_arr.length; i++) {
        var name = data_arr[i].categoryName;
        var id = data_arr[i].categoryId;
        $scope.categories[name] = id;
      }
    }, function(response){
      // Do noting
    });

    // Load video infomation
    videoUpdate.getVideoById($routeParams.videoId).then(function(response){
      var resVideo = response.data.data;
      $scope.video = {
        videoName: resVideo.videoName,
        category: {categoryId: resVideo.category.categoryId},
        description: resVideo.description
      };
      $scope.videoLink = 'https://www.youtube.com/watch?v=' + resVideo.videoCode;
      $scope.viewDemo();
    }, function(response){
      alert('Not found this video');
    });

    // Preview
    $scope.viewDemo = function () {
      var str = $scope.videoLink.split("watch?v=");
      $scope.video.videoCode = str[1];
      $scope.video.videoUrl = "https://www.youtube.com/embed/" + str[1];
      $scope.video.videoImage = "http://img.youtube.com/vi/" + str[1] + "/mqdefault.jpg";
    };

    // Update Video
    $scope.updateVideo = function () {
      console.log($routeParams.videoId);
      videoUpdate.updateVideo($scope.video, $routeParams.videoId).then(function(response){
        $scope.sVideo = false;
      }, function(response){
      	console.log(response);
        $scope.fVideo = false;
      });
    }
  }
]);