'use strict';

angular.module('beertube.videoUpdate').service('videoUpdate', ['$http', '$cookies',
  function ($http, $cookies) {
    this.getVideoById = function(video_id) {
      var config = {
        headers: {'Content-Type': 'application/json'}
      };
      return $http.get('http://videoservice-dinhphan.rhcloud.com/videos/'+video_id, config);
    };

    this.updateVideo = function(video, video_id) {
      var token = $cookies.get('user_token');
      console.log(token);
      var config = {
        headers: {'Content-Type': 'application/json',
                  'Authorization': token}
      };
      return $http.put('http://videoservice-dinhphan.rhcloud.com/videos/'+video_id, video, config);
    };
  }
]);