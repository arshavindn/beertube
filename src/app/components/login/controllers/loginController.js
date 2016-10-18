'use strict';

var loginController = angular.module('loginController', [
    'ngRoute',
    'loginService',
    'ngCookies'
]);

loginController.controller("LoginController", ['$scope', '$window', 'loginService', '$cookies',
    function ($scope, $window, loginService, $cookies) {
        $scope.userStatus = $cookies.get("userStatus");
        $scope.userName = $cookies.get("userName");
        $scope.userId = $cookies.get("userId");
        $scope.user = {
            userEmail: "",
            userPassword: ""
        }
        $scope.login = function () {
            loginService.loginUser($scope.user).then(function (response) {
                var user = response.data;
                if (user.userId === 0) {
                    $scope.user.userEmail = "";
                    $scope.user.userPassword = "";
                } else {
                    $cookies.put("userId", user.userId);
                    $cookies.put("userName", user.userName);
                    $cookies.put("userStatus", "login");
                    $window.history.back();//come back url page
                }
            }, function (response) {
                alert("something wrong");
            });
        }
    }]);

