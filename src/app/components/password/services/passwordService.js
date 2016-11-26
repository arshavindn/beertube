'use strict';

angular.module('beertube.password').service('password', ['$http', '$cookies', 
  function ($http, $cookies) {
    this.updatePassword = function (password) {
      var token = $cookies.get('user_token');
      var config = {
        headers: {'Content-Type': 'application/json',
                  'Authorization': token}
      };
      return $http.put('https://videoservice-dinhphan.rhcloud.com/users/changePassword', password, config);
    }
  }
]);