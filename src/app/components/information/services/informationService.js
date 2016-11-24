'use strict';

angular.module('beertube.information').service('information', ['$http',
  function ($http) {
    this.getUserById = function(id) {
      var config = {
        headers: {'Content-Type': 'application/json'}
      };
      return $http.get('http://videoservice-dinhphan.rhcloud.com/users/'+id, config);
    };

    this.getAllVideoUserUploaded = function(user_id) {
      var config = {
        headers: {'Content-Type': 'application/json'}
      };
      return $http.get('http://videoservice-dinhphan.rhcloud.com/users/getAllVideoUserUploaded/'+user_id, config);
    }
  }
]);