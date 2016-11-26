'use strict';

angular.module('beertube.login').service('login', ['$http', '$cookies', function ($http, $cookies) {
  this.loginUser = function (user) {
    var config = {
      headers: {'Content-Type': 'application/json',
                'Accept': '*/*'}
    };
    return $http.post("http://videoservice-dinhphan.rhcloud.com:80/auth/**",
                      user, config);
  };

  this.getUserInfo = function () {
    var token = $cookies.get('user_token');
    var config = {
      headers: {'Content-Type': 'application/json',
                'Authorization': token}
    };
    return $http.get('http://videoservice-dinhphan.rhcloud.com/users/getInforMySelf', config);
  };
}]);
