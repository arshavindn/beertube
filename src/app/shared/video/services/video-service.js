angular.module('beertube.video').service('VideoService',
  function($q, $http, $log, youtubeAPI, beertubeAPI) {

    var service = this;
    service.mostViewed = function (limit) {
      limit = limit || 5;
      sortedArrayOfAllVideos = service.all().sort(function(video1, video2) {
        return video1.view - video2.view;
      });
      return sortedArrayOfAllVideos.slice(0, limit);
    };

    service.update = function (id, attributes) {

    };

    service.videoYoutubeData = function (videoId) {
      var defer = defer || $q.defer();
      var part = youtubeAPI.PART.join(',');
      $http.get(youtubeAPI.URL, {
        params: {key: youtubeAPI.KEY, id: videoId, part: part}
      }).then(
        function (response) { defer.resolve(response.data.items[0]); },
        function (response) { defer.reject(response); }
      );
      return defer.promise;
    };

    service.all = function() {
      var defer = defer || $q.defer();
      $http.get(beertubeAPI.URL + '/videos').then(
        function (response) { defer.resolve(response.data.data); },
        function (response) { defer.reject(response); }
      );
      return defer.promise;
    };

    var fakedVideos = generateVideos(100);
    function generateVideos(length) {
      var videoIds = ['68aKCIXZ-LY', 'PWhMoGt0cs8', 'PbP-aIe51Ek', 'Pw-0pbY9JeU',
                      '2R1l3WGc-VM', 'zBIthmpJAPE', 'j8IWo-Zatjc', 'dj67l-9WA8M',
                      'jXnDJke-03g', 'xS0XiOLW_Qk', 'mer6X7nOY_o', 'JGulAZnnTKA',
                      'PT2_F-1esPk', 'fklCn923h1E', 'WVPRkcczXCY', 'FW-IMI7TTRU',
                      '-ASznZdlidI', 'TPFJGIXXeq0', 'Div0iP65aZo', 'fftNf-bDUY0'];
      var videoData = [];
      for (var i = 1; i <= length; i++) {
        var video = {
          id: i,
          videoId: videoIds[faker.random.number(videoIds.length - 1)],
          title: faker.lorem.sentence(15),
          description: faker.lorem.sentence(10),
          view: faker.random.number({min: 100, max: 50000000}),
          point: faker.random.number(80000)
        };
        videoData.push(video);
      }
      return videoData;
    }
  });
