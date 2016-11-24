'use strict';

angular.module('beertube.profile').service('profile', ['$http', '$cookies',
  function ($http, $cookies) {
    this.updateUser = function (user) {
      var token = $cookies.get('user_token');
      var config = {
        headers: {'Content-Type': 'application/json',
                  'Authorization': token}
      };
      return $http.put("http://videoservice-dinhphan.rhcloud.com/users/update", user, config);
    };
  }]);