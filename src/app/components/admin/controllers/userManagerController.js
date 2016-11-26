'use strict';

angular.module('beertube.admin').controller('UserManagerCtrl', ['$scope', 'admin', '$cookies', '$window',
  function($scope, admin, $cookies, $window) {
  	if ($cookies.get('user_info') != null && JSON.parse($cookies.get('user_info')).role[1] == 'ROLE_ADMIN') {
	  admin.getAllUser().then(function(response){
	    $scope.users = response.data.data;
      }, function(response){
        console.log('Fail to get all users');
      });
	} else {
	  $window.location.href = '#/';
	}
  }
]);