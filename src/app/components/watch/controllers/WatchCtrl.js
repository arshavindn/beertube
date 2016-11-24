angular.module('beertube.watch').controller('WatchCtrl',
  function ($scope, $routeParams, $window, $location, $http, YoutubeService, Video) {

    init();

    function init() {
      $scope.youtube  = YoutubeService.getYoutube();
      // console.log($scope.youtube);
      $scope.video = Video.find($routeParams.id);
      $scope.video.videoYoutubeData().then(function (data) {
        $scope.video.setDuration(data.contentDetails.duration);
      });
      $scope.a = 10;
      $scope.youtube.videoId = $scope.video.videoId;
      $scope.playlist = Video.limitedPlaylistIncludes($routeParams.id);
      loadIframe();
      YoutubeService.loadPlayer();
    }
    $scope.a = 10;

    angular.element(document).ready(function() {
      var topPos = document.getElementById('playlist-video-' + $scope.video.id).parentElement.offsetTop;
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
      // $window.location.reload();
    }
});
