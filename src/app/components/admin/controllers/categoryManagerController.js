'use strict';

angular.module('beertube.admin').controller('CategoryManagerCtrl', ['$scope', 'admin', '$cookies', '$window',
  function($scope, admin, $cookies, $window) {
    if ($cookies.get('user_info') != null && JSON.parse($cookies.get('user_info')).role[1] == 'ROLE_ADMIN') {
      admin.getAllCategory().then(function(response) {
        $scope.categories = response.data.data;
      }, function(response) {
        console.log('Fail to get all Categories');
      });
      $scope.alert_show = false;

      $scope.updateCategory = function (category_id, category) {
        delete category['$$hashKey'];
        admin.updateCategory(category_id, category).then(function(response) {
          $scope.alert_status = 'success';
          $scope.alert_show = true;
          $scope.alert_content = 'Successfull update!';
        }, function(response) {
          $scope.alert_status = 'danger';
          $scope.alert_show = true;
          $scope.alert_content = 'Fail to update!';
        });
      };

      $scope.createCategory = function() {
        console.log($scope.newCategory);
        admin.createCategory($scope.newCategory).then(function(response){
          $scope.alert_status = 'success';
          $scope.alert_show = true;
          $scope.alert_content = 'Successfull Create category';
          $scope.categories.push()
        }, function(response) {
          $scope.alert_status = 'danger';
          $scope.alert_show = true;
          $scope.alert_content = 'Fail to create!';
        });
      };

      $scope.deleteCategory = function (category_id, category) {
        delete category['$$hashKey'];
        admin.deleteCategory(category_id).then(function(response){
          $scope.alert_status = 'success';
          $scope.alert_show = true;
          $scope.alert_content = 'Successfull deleted!';
          delete $scope.categories[$scope.categories.indexOf(category)];
        }, function(response) {
          $scope.alert_status = 'danger';
          $scope.alert_show = true;
          $scope.alert_content = 'Fail to delete!';
        });
      }
    } else {
    $window.location.href = '#/';
    }
  }
]);