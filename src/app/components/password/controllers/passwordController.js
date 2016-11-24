'use strict';

angular.module('beertube.password').controller('PasswordCtrl', ['$scope', 'password', '$cookies', 'User',
  function ($scope, password, $cookies, User) {
    $scope.oldPassword = "";
    $scope.newPassword = "";
    $scope.passwordConfirm = "";
    $scope.alert_hide = true;
    var user = JSON.parse($cookies.get('user_info'));

    $scope.changePassword = function () {
      if ($scope.oldPassword === user.password) {
        if ($scope.newPassword === $scope.passwordConfirm) {
          var newPwd = {password: $scope.newPassword};          
          password.updatePassword(newPwd).then(function(response){
            $scope.alert_hide = false;
            $scope.alert_status = 'success';
            $scope.alert_content = 'Password was updated successfully';
            // Update user_token
            var new_token = response.data.token;
            $cookies.remove('user_token');
            $cookies.put('user_token', new_token);

            // Update user_info
            User.getUserInfo().then(function (response) {
              var userInfo = JSON.stringify(response.data);
              $cookies.put('user_info', userInfo);
            }, function (response) {
              // Do nothing
            });
          }, function(response){
            $scope.alert_hide = false;
            $scope.alert_status = 'danger';
            $scope.alert_content = 'Fail to change password. Please try again.'
          });
        } else {
          $scope.alert_hide = false;
          $scope.alert_status = 'danger';
          $scope.alert_content = 'New password is not duplicate. Please try again.'
        }
      } else {
        $scope.alert_hide = false;
        $scope.alert_status = 'danger';
        $scope.alert_content = 'Wrong old password. Please try again.'
      }
    };
  }]);