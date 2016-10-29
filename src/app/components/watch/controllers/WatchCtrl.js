angular.module('beertube.watch').controller('WatchCtrl',
  function ($scope, $routeParams, $log, $http, YoutubeService, Video) {

    init();

    function init() {
      $scope.youtube  = YoutubeService.getYoutube();
      $scope.playlist = true;
      $scope.video = Video.find($routeParams.id);
      $scope.youtube.videoId = $scope.video.videoId;

      if (!$scope.youtube.ready) {
        loadIframe();
      }
      else {
        YoutubeService.loadPlayer();
      }

      allVideos = Video.all();

    }

    function loadIframe() {
      var tag = document.createElement('script');
      tag.src = "http://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    $scope.launch = function (videoId, title) {
      YoutubeService.launchPlayer(videoId, title);
      $log.info('Launched videoId:' + videoId + ' and title:' + title);
    };
});
