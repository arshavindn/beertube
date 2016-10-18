'use strict';

// Custom services
var userService = angular.module("userService", []);

userService.service('manageUser', ['$http', function ($http) {
    //create User
    this.createUser = function (user) {
        var config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        return $http.post("http://phanvudinh-dinhphan.rhcloud.com/rest/user", user, config);
    }
    //login User
    this.loginUser = function (user) {
        var config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        return $http.post("http://phanvudinh-dinhphan.rhcloud.com/rest/login", user, config);
    }
    //get User by id
    this.getUserById = function (userId) {
        return $http.get("http://phanvudinh-dinhphan.rhcloud.com/rest/user/"+userId);
    }
}]);