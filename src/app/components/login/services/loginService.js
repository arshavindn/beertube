'use strict';

angular.module('beertube.login').service('login', ['$http', '$cookies', function ($http, $cookies) {
  this.loginUser = function (user) {
    var config = {
      headers: {'Content-Type': 'application/json',
                'Accept': '*/*'}
    };
    return $http.post("https://videoservice-dinhphan.rhcloud.com/auth",
                      user, config);
  };

  this.getUserInfo = function () {
    var token = $cookies.get('user_token');
    var config = {
      headers: {'Content-Type': 'application/json',
                'Authorization': token}
    };
    return $http.get('https://videoservice-dinhphan.rhcloud.com/users/getInforMySelf', config);
  };
}]);
