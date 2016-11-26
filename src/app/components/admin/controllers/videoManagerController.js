'use strict';

angular.module('beertube.admin').controller('VideoManagerCtrl', ['$scope', 'admin', 
  function($scope, admin) {
  	$scope.approvedVideos = [];
  	$scope.pendingVideos = [];
  	$scope.rejectVideos = [];

    admin.getAllVideos().then(function(response) {
      var all_videos = response.data.data;
      for (var i=0; i<all_videos.length; i++) {
        if (all_videos[i].status == 'approved') $scope.approvedVideos.push(all_videos[i]);
        if (all_videos[i].status == 'pending') $scope.pendingVideos.push(all_videos[i]);
        if (all_videos[i].status == 'reject') $scope.rejectVideos.push(all_videos[i]);
      }
    }, function(response) {
      console.log('Can not load all Video');
    });

    $scope.updateVideo = function(video, status, index) {
      var convertString;
      if (status == 'reject' && video.status == 'approved') convertString = 'ApprovedToReject';
      if (status == 'reject' && video.status == 'pending') convertString = 'PendingToReject';
      if (status == 'approved' && video.status == 'pending') convertString = 'PendingToApproved';
      if (status == 'approved' && video.status == 'reject') convertString = 'RejectToApproved';
      video.status = status;
      delete video['$$hashKey'];
      console.log(video);
      admin.updateVideo(video, video.videoId).then(function(response) {
        console.log(response);
        if (convertString == 'ApprovedToReject') {
          $scope.approvedVideos.splice(index, 1);
          $scope.rejectVideos.splice(0, 0, video);
        }
        if (convertString == 'PendingToReject') {
          $scope.pendingVideos.splice(index, 1);
          $scope.rejectVideos.splice(0, 0, video);
        }
        if (convertString == 'PendingToApproved') {
          $scope.pendingVideos.splice(index, 1);
          $scope.approvedVideos.splice(0, 0, video);
        }
        if (convertString == 'RejectToApproved') {
          $scope.rejectVideos.splice(index, 1);
          $scope.approvedVideos.splice(0, 0, video);
        }
      }, function(response) {
        console.log(response);
      });
    }
  }
])