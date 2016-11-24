angular.module('beertube.watch').controller('WatchCtrl',
  function ($scope, $routeParams, $window, $location, $http, YoutubeService, Video) {

    init();

    function init() {
      $scope.youtube  = YoutubeService.getYoutube();
      // console.log($scope.youtube);
      $scope.video = null;
      Video.find($routeParams.id).then(function (video) {
        $scope.video = video;
        $scope.video.videoYoutubeData().then(function (data) {
          $scope.video.setDuration(data.contentDetails.duration);
        });
        $scope.youtube.videoId = $scope.video.videoId;
        loadIframe();
        YoutubeService.loadPlayer();
      });

      $scope.playlist = [];
      Video.limitedPlaylistIncludes($routeParams.id).then(function (playlist) {
        $scope.playlist = playlist;
      });
    }

    angular.element(document).ready(function() {
      scrollToCurrentVideoInPlaylist();
      playlistScrollHandle();
    });

    function loadIframe() {
      var tag = document.createElement('script');
      tag.src = "http://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    $scope.goto = function (video) {
      $scope.video = angular.copy(video);
      YoutubeService.launchPlayer(video.videoId, video.title);
      // $log.info('Launched videoId:' + video.videoId + ' and title:' + video.title);
      $location.path('/watch/' + video.id).replace();
    }

    scrollToCurrentVideoInPlaylist = function () {
      var topPos = document.getElementById('playlist-video-' + $routeParams.id).parentElement.offsetTop;
      $scrollablePlaylist = document.getElementsByClassName('list')[0]
      $scrollablePlaylist.scrollTop = topPos-10;
      $scrollablePlaylist.addEventListener('scroll', function() {
        // scroll to top
        if ($scrollablePlaylist.scrollTop == 0) {
          console.log('hello');
        }
        // scroll to bottom
        if ($scrollablePlaylist.scrollTop == $scrollablePlaylist.scrollHeight - $scrollablePlaylist.clientHeight) {
          console.log('see you');
        }
      });
    }

    playlistScrollHandle = function () {
      $scrollablePlaylist = document.getElementsByClassName('list')[0]
      $scrollablePlaylist.addEventListener('mouseenter', function(e) {
        var mouseoverTarget = e.target || e.srcElement;
        document.body.addEventListener('wheel', function(e) {
          var wheelTarget = e.target || e.srcElement;
          if ($scrollablePlaylist.scrollTop == 0 && e.deltaY < 0 ||
              $scrollablePlaylist.scrollTop == $scrollablePlaylist.scrollHeight - $scrollablePlaylist.clientHeight && e.deltaY > 0) {
            if (mouseoverTarget.contains(wheelTarget)) {
              e.preventDefault();
            }
          }
        });
      });
    }
});
