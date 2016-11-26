'use strict';

angular.module('beertube.admin').controller('UserManagerCtrl', ['$scope', 'admin', '$cookies', '$window',
  function($scope, admin, $cookies, $window) {
  	if ($cookies.get('user_info') != null && JSON.parse($cookies.get('user_info')).role.indexOf('ROLE_ADMIN') != -1) {
  	  // Load all User
      admin.getAllUser().then(function(response){
  	    $scope.users = response.data.data;
        }, function(response){
          console.log('Fail to get all users');
        });

      // Load Role
      $scope.userRole = function (user) {
        if (user.permissionList.length == 0) return 'ROLE_GUESS';
        else {
          for (var i=0; i<user.permissionList.length; i++) {
            if (user.permissionList[i].role.roleName == 'ROLE_ADMIN') return 'ROLE_ADMIN';
          }
          return 'ROLE_USER';
        }
      };

      // Set role for user
      $scope.setRole = function (user_id, role_name, index) {
        console.log(role_name);
        admin.setRole(user_id, role_name).then(function(response) {
          console.log(response);
          admin.getUserById(user_id).then(function(response){
            $scope.users.splice(index, 1, response.data.data);
            console.log($scope.userRole(response.data.data));
          });
          
        }, function(response) {
          console.log(response);
        });
      };

      // Remove Role
      $scope.removeRole = function (user_id, role_name, index) {
        admin.removeRole(user_id, role_name).then(function(response) {
          console.log(response);
          admin.getUserById(user_id).then(function(response){
            $scope.users.splice(index, 1, response.data.data);
          });
        }, function(response) {
          console.log(response);
        });
      }
      
  	} else {
  	  $window.location.href = '#/';
  	}
  }
]);