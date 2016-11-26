'use strict';

angular.module('beertube.admin').service('admin', ['$http', '$cookies',
  function($http, $cookies) {
    this.getAllUser = function() {
      var config = {
        headers: {'Content-Type': 'application/json'}
      };
      return $http.get('https://videoservice-dinhphan.rhcloud.com/users', config);
    };

    this.getUserById = function(user_id) {
      var config = {
        headers: {'Content-Type': 'application/json'}
      };
      return $http.get('https://videoservice-dinhphan.rhcloud.com/users/'+user_id, config);
    };

    this.setRole = function(user_id, role_name) {
      var token = $cookies.get('user_token');
      var config = {
        headers: {'Content-Type': 'application/json',
                  'Authorization': token}
      };
      return $http.put('https://videoservice-dinhphan.rhcloud.com/users/assignRole/'+user_id+'/'+role_name, config);
    };

    this.removeRole = function(user_id, role_name) {
      var token = $cookies.get('user_token');
      var config = {
        headers: {'Content-Type': 'application/json',
                  'Authorization': token}
      };
      return $http.put('https://videoservice-dinhphan.rhcloud.com/users/removeRole/'+user_id+'/'+role_name, config);
    };

    this.getAllCategory = function() {
      var config = {
        headers: {'Content-Type': 'application/json'}
      };
      return $http.get('https://videoservice-dinhphan.rhcloud.com/categories', config);
    };

    this.updateCategory = function(category_id, category) {
      var token = $cookies.get('user_token');
      var config = {
        headers: {'Content-Type': 'application/json',
                  'Authorization': token}
      };
      return $http.put('https://videoservice-dinhphan.rhcloud.com/categories/'+category_id, category, config);
    };

    this.createCategory = function(category) {
      var token = $cookies.get('user_token');
      var config = {
        headers: {'Content-Type': 'application/json',
                  'Authorization': token}
      };
      return $http.post('https://videoservice-dinhphan.rhcloud.com/categories', category, config);
    };

    this.deleteCategory = function(category_id) {
      var token = $cookies.get('user_token');
      var config = {
        headers: {'Content-Type': 'application/json',
                  'Authorization': token}
      };
      return $http.delete('https://videoservice-dinhphan.rhcloud.com/categories/'+ category_id, config);
    };

    this.getAllVideos = function() {
      var config = {
        headers: {'Content-Type': 'application/json'}
      };
      return $http.get('https://videoservice-dinhphan.rhcloud.com/videos', config);
    };

    this.updateVideo = function(video, video_id) {
      var token = $cookies.get('user_token');
      var config = {
        headers: {'Content-Type': 'application/json',
                  'Authorization': token}
      };
      return $http.put('https://videoservice-dinhphan.rhcloud.com/videos/'+video_id, video, config);
    }
  }
]);