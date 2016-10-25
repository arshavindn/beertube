'use strict';

angular.module('beertube.profile').service('profile', ['$http', 
  function ($http) {
    this.getUserById = function (userId) {
      return $http.get("http://webservice-dinhphan.rhcloud.com/rest/user/" + userId);
    };
  }]);