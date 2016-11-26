'use strict';

angular.module('beertube.favorite').service('favorite', ['$http', 
  function($http) {
    this.getAllVideoUserLiked = function (user_id) {
      var config = {
        headers: {'Content-Type': 'application/json'}
      };
      return $http.get('https://videoservice-dinhphan.rhcloud.com/users/getAllVideoUserLiked/'+user_id, config);
    };
  }
]);