angular.module('beertube.user').factory('User', function (beertubeAPI) {
  function User(userJSON) {
    this.id = userJSON.id;
    this.fullName = userJSON.fullName;
    this.email = userJSON.email;
    this.joinDate = userJSON.createAt;
    this.avatarUrl = userJSON.avatarUrl;
    this.token = null;
  }

  User.prototype.videos = function() {
    var defer = $q.defer();
    $http.get(beertubeAPI.URL + '/users/getAllVideoUserUploaded', {
      params: {userId: this.id}
    }).then(
      function (response) {
        var videos = response.data.data;
        defer.resolve(videos.map(function(videoJSON) {
          return new Video(videoJSON);
        }));
      },
      function () { defer.reject(response); }
    );
    return defer.promise;
  };

  return User;
});
