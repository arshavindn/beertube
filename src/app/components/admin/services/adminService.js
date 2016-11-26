'use strict';

angular.module('beertube.admin').service('admin', ['$http', '$cookies',
  function($http, $cookies) {
    this.getAllUser = function() {
      var config = {
        headers: {'Content-Type': 'application/json'}
      };
      return $http.get('http://videoservice-dinhphan.rhcloud.com/users', config);
    };

    this.getAllCategory = function() {
      var config = {
        headers: {'Content-Type': 'application/json'}
      };
      return $http.get('http://videoservice-dinhphan.rhcloud.com/categories', config);
    };

    this.updateCategory = function(category_id, category) {
      var token = $cookies.get('user_info');
      var config = {
        headers: {'Content-Type': 'application/json',
                  'Authorization': token}
      };
      return $http.put('http://videoservice-dinhphan.rhcloud.com/categories/'+category_id, category, config);
    };

    this.createCategory = function(category) {
      var token = $cookies.get('user_info');
      var config = {
        headers: {'Content-Type': 'application/json',
                  'Authorization': token}
      };
      return $http.post('http://videoservice-dinhphan.rhcloud.com/categories', category, config);
    };

    this.deleteCategory = function(category_id) {
      var token = $cookies.get('user_info');
      var config = {
        headers: {'Content-Type': 'application/json',
                  'Authorization': token}
      };
      return $http.delete('http://videoservice-dinhphan.rhcloud.com/categories/'+ category_id, config);
    }
  }
]);