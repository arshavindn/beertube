'use strict';

angular.module('beertube.favorite').controller('FavoriteCtrl', function ($scope, $http, favorite, $cookies, $routeParams, beertubeAPI, User) {
  favorite.getAllVideoUserLiked($routeParams.userId).then(function(response){
    $scope.videos = response.data.data;
    $scope.currentPlaylist = undefined;
  }, function(response){
    alert('Not found');
  });

  $scope.playlists = [];
  var userData = $cookies.get('user_info');
  if (userData !== null && userData !== undefined) {
    $scope.currentUser = new User(JSON.parse(userData));
    $scope.currentUser.token = $cookies.get('user_token');
    $scope.currentUser.playlists().then(function(playlists) {
      $scope.playlists = playlists;
    });
    $scope.addPlaylist = function() {
      $scope.currentUser.addPlaylist($scope.playlistName).then(function(playlist) {
        $scope.playlists.push(playlist);
        $scope.playlistName = '';
      }).catch(function (response) {
        alert('An error occured when creating playlist.');
      });
    };
    $scope.removePlaylist = function(playlist) {
      if (confirm('Do you want to remove playlist?')) {
        $scope.currentUser.removePlaylist(playlist.playListId).then(function(response) {
          $scope.playlists = _.without($scope.playlists, playlist);
        }).catch(function (response) {
          alert('An error occured when deleting playlist.');
        });
      }
    };
    $scope.selectPlaylist = function (playlist) {
      if (playlist === undefined) {
        favorite.getAllVideoUserLiked($routeParams.userId).then(
          function(response) {
            $scope.videos = response.data.data;
          },
          function(response) {}
        );
      }
      else {
        $http.get(beertubeAPI.URL + '/playlists/getVideoByPlayList/' + playlist.playListId,
                  {}, {headers: {Authorization: $scope.currentUser.token}}).then(
          function(response) {
            $scope.videos = response.data.data;
            $scope.currentPlaylist = playlist;
          },
          function(response) {}
        );
      }
    };
  }
  else {
    $scope.currentUser = null;
  }
});
