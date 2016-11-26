'use strict';

angular.module('beertube.information').service('information', ['$http', '$cookies',
  function ($http, $cookies) {
    this.getUserById = function(id) {
      var config = {
        headers: {'Content-Type': 'application/json'}
      };
      return $http.get('http://videoservice-dinhphan.rhcloud.com/users/'+id, config);
    };

    this.getAllVideoUserUploaded = function(user_id) {
      var config = {
        headers: {'Content-Type': 'application/json'}
      };
      return $http.get('http://videoservice-dinhphan.rhcloud.com/users/getAllVideoUserUploaded/'+user_id, config);
    };

    this.getAllFollowing = function(user_id) {
      var config = {
        headers: {'Content-Type': 'application/json'}
      };
      return $http.get('http://videoservice-dinhphan.rhcloud.com/users/getAllFollower/'+user_id, config);
    };

    this.getAllFollowers = function(user_id) {
      var config = {
        headers: {'Content-Type': 'application/json'}
      };
      return $http.get('http://videoservice-dinhphan.rhcloud.com/users/getAllFollowing/'+user_id, config);
    };

    this.followUser = function(user_id) {
      var token = $cookies.get('user_token');
      var config = {
        headers: {'Content-Type': 'application/json',
                  'Authorization': token}
      };
      return $http.post('http://videoservice-dinhphan.rhcloud.com/users/follow/'+user_id, config);
    };

    this.unFollowUser = function(user_id) {
      var token = $cookies.get('user_token');
      var config = {
        headers: {'Content-Type': 'application/json',
                  'Authorization': token}
      };
      return $http.delete('http://videoservice-dinhphan.rhcloud.com/users/unFollow/'+user_id, config);
    };

    this.isFollowing = function(user_id) {
      var token = $cookies.get('user_token');
      var config = {
        headers: {'Content-Type': 'application/json',
                  'Authorization': token}
      };
      return $http.get('http://videoservice-dinhphan.rhcloud.com/users/isFollow/'+user_id, config);
    }
  }
]);