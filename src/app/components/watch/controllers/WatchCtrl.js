angular.module('beertube.watch').controller('WatchCtrl',
  function ($scope, $routeParams, $window, $location, $http, $cookies, YoutubeService, WatchService, Video, User, VideoComment) {

    init();

    function init() {
      var userData = $cookies.get('user_info');
      $scope.userPlaylists = [];
      if (userData !== null && userData !== undefined) {
        $scope.currentUser = new User(JSON.parse(userData));
        $scope.currentUser.token = $cookies.get('user_token');
        $scope.currentUser.likeVideoIds().then(function(videoIds) {
          if (videoIds.indexOf(parseInt($routeParams.id)) >= 0) {
            $scope.checkLike = true;
          }
          else {
            $scope.checkLike = false;
          }
        });
        $scope.currentUserPostComment = function () {
          VideoComment.create($scope.currentUser.token, $scope.video.id, $scope.commentPostContent)
            .then(function(comment) {
              $scope.comments.unshift(comment);
              $scope.commentPostContent = '';
            }).catch(function () {
              alert("Can't post comment. Please try again!");
          });
        };
        $scope.currentUser.playlists().then(function (playlists) {
          $scope.userPlaylists = playlists;
          $scope.userPlaylists.forEach(function(pl) {
            WatchService.getVideosOfPlaylist(pl.playListId).then(function(videos) {
              pl.videos = videos.map(function(video) {return video.videoId;});
            });
          });
          $scope.addToPlaylist = function (playlist) {
            if (playlist.videos.indexOf($scope.video.id) < 0) {
              WatchService.addVideoToPlaylistOfUser(playlist.playListId, $scope.video.id, $scope.currentUser.token).then(function(response) {
                playlist.videos.push($scope.video.id);
              }).catch(function (response) {
                alert('An error occured. Please try again later!');
              });
            }
            else {
              WatchService.removeVideoFromPlaylistOfUser(playlist.playListId, $scope.video.id, $scope.currentUser.token).then(function(response) {
                playlist.videos = _.without(playlist.videos, $scope.video.id);
              }).catch(function (response) {
                alert('An error occured. Please try again later!');
              });
            }
          };
        });
      }
      else {
        $scope.currentUser = null;
      }

      $scope.youtube  = YoutubeService.getYoutube();
      $scope.video = null;
      Video.find($routeParams.id).then(function (video) {
        $scope.video = video;
        $scope.video.videoYoutubeData().then(function (data) {
          $scope.video.setDuration(data.contentDetails.duration);
        });
        $scope.youtube.videoId = $scope.video.videoId;
        loadIframe();
        YoutubeService.loadPlayer();

        $scope.comments = [];
        getComments();
        $scope.loadingComment = false;
        $scope.commentLoadMore = function() {
          if ($scope.video.numberOfComment > $scope.comments.length ||
              ($scope.video.numberOfComment === 0 && $scope.video.numberOfComment < $scope.comments.length)) {
            if (!$scope.loadingComment) {
              $scope.loadingComment = true;
              console.log('loading comments...');
              $scope.video.comments().then(function(comments) {
                $scope.loadingComment = false;
                var moreComments = comments.slice($scope.comments.length, $scope.comments.length + 5);
                $scope.comments = $scope.comments.concat(moreComments);
              });
            }
          }
        };
      });

      $scope.playlist = [];
      Video.limitedPlaylistIncludes($routeParams.id).then(function (playlist) {
        $scope.playlist = playlist;
        angular.element(document).ready(function() {
          scrollToCurrentVideoInPlaylist();
          playlistScrollHandle();
        });
      });

      $scope.commentPostContent = '';

      Video.mostViewed(7).then(function (videos) {
        $scope.famousVideos = videos;
      });
    }

    function loadIframe() {
      var tag = document.createElement('script');
      tag.src = "http://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    $scope.goto = function (video) {
      $scope.video = angular.copy(video);
      YoutubeService.launchPlayer(video.videoId, video.title);
      getComments();
      // $log.info('Launched videoId:' + video.videoId + ' and title:' + video.title);
      $location.path('/watch/' + video.id).replace();
    };

    getComments = function() {
      $scope.video.comments().then(function(comments) {
        $scope.video.numberOfComment = comments.length;
        $scope.comments = comments.slice(0, 5);
      });
    };

    $scope.limitPlaylistLoadUp = function () {
      var firstId = $scope.playlist[0].id;
    };

    $scope.like = function () {
      if ($scope.checkLike === true) {
        $scope.currentUser.unlikeAVideo($routeParams.id).then(function(response){
          $scope.checkLike = false;
        });
      }
      else {
        $scope.currentUser.likeAVideo($routeParams.id).then(function(response){
          $scope.checkLike = true;
        });
      }
    };

    scrollToCurrentVideoInPlaylist = function () {
      var topPos = document.getElementById('playlist-video-' + $routeParams.id).parentElement.offsetTop;
      $scrollablePlaylist = document.getElementsByClassName('list')[0];
      $scrollablePlaylist.scrollTop = topPos-10;
      $scrollablePlaylist.addEventListener('scroll', function() {
        // scroll to top
        if ($scrollablePlaylist.scrollTop === 0) {
          console.log('hello');
        }
        // scroll to bottom
        if ($scrollablePlaylist.scrollTop == $scrollablePlaylist.scrollHeight - $scrollablePlaylist.clientHeight) {
          console.log('see you');
        }
      });
    };

    playlistScrollHandle = function () {
      $scrollablePlaylist = document.getElementsByClassName('list')[0];
      $scrollablePlaylist.addEventListener('mouseenter', function(e) {
        var mouseoverTarget = e.target || e.srcElement;
        document.body.addEventListener('wheel', function(e) {
          var wheelTarget = e.target || e.srcElement;
          if ($scrollablePlaylist.scrollTop === 0 && e.deltaY < 0 ||
              $scrollablePlaylist.scrollTop == $scrollablePlaylist.scrollHeight - $scrollablePlaylist.clientHeight && e.deltaY > 0) {
            if (mouseoverTarget.contains(wheelTarget)) {
              e.preventDefault();
            }
          }
        });
      });
    };
});
