angular.module('beertube.user').service('UserService', function($q, $http, $log, $cookies, beertubeAPI, User) {
  var currentUser = null;

  var service = this;

  service.login = function(email, password) {
    var config = {
      headers: {'Content-Type': 'application/json',
                'Accept': '*/*'}
    };
    var defer = defer || $q.defer();
    $http.post(beertubeAPI.URL + '/auth', {email: email, password: password}, config).then(
      function (response) {
        var videos = response.data.data;
        defer.resolve(videos.map(function(videoJSON) {
          return new Video(videoJSON);
        }));
      },
      function (response) { defer.reject(response); }
    );
  };

  service.getCurrentUser = function () {
    return currentUser;
  };
});
