angular.module('beertube.user').factory('User', function ($q, $http, beertubeAPI) {
  function User(userJSON) {
    this.id = userJSON.userId;
    this.fullName = userJSON.fullName;
    this.email = userJSON.email;
    this.joinDate = userJSON.createAt;
    this.avatarUrl = userJSON.avatarUrl;
    this.token = null;
  }

  User.prototype.uploadVideos = function() {
    var defer = defer || $q.defer();
    $http.get(beertubeAPI.URL + '/users/getAllVideoUserUploaded' + this.id).then(
      function (response) {
        var videos = response.data.data;
        defer.resolve(videos.map(function(videoJSON) {
          return new Video(videoJSON);
        }));
      },
      function (response) { defer.reject(response); }
    );
    return defer.promise;
  };

  User.prototype.likeVideoIds = function() {
    var defer = defer || $q.defer();
    $http.get(beertubeAPI.URL + '/users/getAllVideoUserLiked/' + this.id).then(
      function (response) {
        var videos = response.data.data;
        defer.resolve(videos.map(function(videoJSON) {
          return videoJSON.videoId;
        }));
      },
      function (response) { defer.reject(response); }
    );
    return defer.promise;
  };

  User.prototype.likeAVideo = function(videoId) {
    var defer = defer || $q.defer();
    console.log(videoId);
    $http.post(beertubeAPI.URL + '/videos/like/' + videoId, {}, {headers: {Authorization: this.token}}).then(
      function (response) {
        defer.resolve(response);
      },
      function (response) { defer.reject(response); }
    );
    return defer.promise;
  };

  User.prototype.unlikeAVideo = function(videoId) {
    var defer = defer || $q.defer();
    console.log(videoId);
    var config = {
      headers: {'Content-Type': 'application/json', Authorization: this.token}
    };
    $http.put(beertubeAPI.URL + '/videos/unLike/' + videoId, {}, config).then(
      function (response) {
        console.log('haha');
        defer.resolve(response);
      },
      function (response) { console.log('haha2'); defer.reject(response); }
    );
    return defer.promise;
  };

  User.prototype.playlists = function() {
    var defer = defer || $q.defer();
    var config = {
      headers: {'Content-Type': 'application/json', Authorization: this.token}
    };
    $http.get(beertubeAPI.URL + '/playlists/getAllPlayListByUserId/' + this.id).then(
      function (response) {
        defer.resolve(response.data.data);
      },
      function (response) { defer.reject(response); }
    );
    return defer.promise;
  };

  User.prototype.addPlaylist = function(playlistName) {
    var defer = defer || $q.defer();
    var config = {
      headers: {'Content-Type': 'application/json', Authorization: this.token}
    };
    $http.post(beertubeAPI.URL + '/playlists', {playListName: playlistName}, config).then(
      function (response) {
        defer.resolve(response.data.data);
      },
      function (response) { defer.reject(response); }
    );
    return defer.promise;
  };

  User.prototype.removePlaylist = function(id) {
    var defer = defer || $q.defer();
    var config = {
      headers: {'Content-Type': 'application/json', Authorization: this.token}
    };
    $http.delete(beertubeAPI.URL + '/playlists/' + id, config).then(
      function (response) {
        defer.resolve(response);
      },
      function (response) { defer.reject(response); }
    );
    return defer.promise;
  };

  return User;
});
