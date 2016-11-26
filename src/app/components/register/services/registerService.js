'use strict';

angular.module('beertube.register').service('register', ['$http', 
  function ($http) {
    this.createUser = function (user) {
      var config = {
        headers: {'Content-Type': 'application/json'}
      };
      return $http.post('https://videoservice-dinhphan.rhcloud.com/users', user, config);
    }
  }]);