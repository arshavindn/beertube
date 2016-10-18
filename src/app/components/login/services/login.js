'use strict';

angular.module('beertube.login').service('login', ['$http', function ($http) {
  this.loginUser = function (user) {
    var config = {
      headers: {'Content-Type': 'application/json'}
    };
    return $http.post("http://phanvudinh-dinhphan.rhcloud.com/rest/user",
                      user, config);
  };
}]);
