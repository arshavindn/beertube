'use strict';

// Custom services
var userService = angular.module("userService", []);

userService.service('User', ['$http', '$cookies', function ($http, $cookies) {
  this.getUserInfo = function () {
    var token = $cookies.get('user_token');
    var config = {
      headers: {'Content-Type': 'application/json',
                'Authorization': token}
    };
    return $http.get('http://videoservice-dinhphan.rhcloud.com/users/getInforMySelf', config);
  }
}]);