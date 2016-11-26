angular.module('beertube.watch').service('WatchService', function ($http, $q, beertubeAPI) {
  var service = this;

  service.getVideosOfPlaylist = function (playlistd, userToken) {
    var defer = defer || $q.defer();
    $http.get(beertubeAPI.URL + '/playlists/getVideoByPlayList/' + playlistd)
    .then(
      function(response) { defer.resolve(response.data.data); },
      function(response) { defer.reject(response); }
    );
    return defer.promise;
  };

  service.addVideoToPlaylistOfUser = function (playlistId, videoId, userToken) {
    var defer = defer || $q.defer();
    $http.post(beertubeAPI.URL + '/playlists/addVideoToPlayList/'+playlistId+'/'+videoId,
               {}, {headers: {Authorization: userToken}}).then(
      function(response) { defer.resolve(response); },
      function(response) { defer.reject(response); }
    );
    return defer.promise;
  };

  service.removeVideoFromPlaylistOfUser = function (playlistId, videoId, userToken) {
    var defer = defer || $q.defer();
    $http.delete(beertubeAPI.URL + '/playlists/removeVideoFromPlayList/'+playlistId+'/'+videoId,
               {}, {headers: {Authorization: userToken}}).then(
      function(response) { defer.resolve(response); },
      function(response) { defer.reject(response); }
    );
    return defer.promise;
  };
});
