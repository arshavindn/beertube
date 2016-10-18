'use strict';

var loginService = angular.module('loginService', []);

loginService.service('loginService', ['$http', function ($http) {
  this.loginUser = function (user) {
    var config = {
      headers: {'Content-Type': 'application/json'}
    }
    return $http.post("http://phanvudinh-dinhphan.rhcloud.com/rest/user", user, config);
  }
}]);