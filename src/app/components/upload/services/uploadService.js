'use strict';

angular.module('beertube.upload').service('upload', ['$http', '$cookies', 
  function($http, $cookies) {
  	this.createVideo = function(video) {
  	  var token = $cookies.get('user_token');
      var config = {
        headers: {'Content-Type': 'application/json',
                  'Authorization': token}
      };
      return $http.post('http://videoservice-dinhphan.rhcloud.com/videos', video, config);
  	};

  	this.getAllCategories = function() {
  	  var config = {
  	    headers: {'Content-Type': 'application/json'}
  	  };
  	  return $http.get('http://videoservice-dinhphan.rhcloud.com/categories', config);
  	};
  }
]);