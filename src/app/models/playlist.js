angular.module('beertube.models').factory('Playlist', function(User, Video) {
  function Playlist(playlistJSON) {
    this.id = playlistJSON.playListId;
    this.name = playlistJSON.playListName;
    this.creater = new User(playlistJSON.creater);
    this.numberOfVideos = 0;
  }

  Playlist.prototype.videos = function () {
    var defer = defer || $q.defer();
    $http.get(beertubeAPI.URL + '/playlists/getVideoByPlaylist/' + this.id, {},
              {headers: {Authorization: this.creater.token}}).then(
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

  Playlist.prototype.getNumberOfVides = function () {
    var defer = defer || $q.defer();
    this.videos.then(function (videos) {
        defer.resolve(videos.length);
      },
      function (response) { defer.reject(response); }
    );
    return defer.promise;
  };

  return Playlist;
});
