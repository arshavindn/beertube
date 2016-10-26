angular.module('beertube.watch').controller('WatchCtrl', function ($scope, $http, $log, YoutubeServices) {

  init();

  function init() {
    $scope.youtube  = YoutubeServices.getYoutube();
    $scope.youtube.videoId = 'Div0iP65aZo'
    $scope.playlist = true;
  }

  // $scope.$on('$viewContentLoaded', function() {
  //   $scope.launch('Div0iP65aZo', 'Bla');
  // });

  $scope.launch = function (id, title) {
    YoutubeServices.launchPlayer(id, title);
    $log.info('Launched id:' + id + ' and title:' + title);
  };
});
