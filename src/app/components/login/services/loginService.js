'use strict';

angular.module('beertube.login').service('login', ['$http', function ($http) {
  this.loginUser = function (user) {
    var config = {
      headers: {'Content-Type': 'application/json',
                'Accept': '*/*'}
    };
    return $http.post("http://videoservice-dinhphan.rhcloud.com:80/auth/**",
                      user, config);
  };
}]);
