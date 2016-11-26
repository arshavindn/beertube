angular.module('beertube.video').factory('Video', function ($q, $http, beertubeAPI, VideoService, VideoComment) {
  function Video(videoJSON) {
    this.id          = videoJSON.videoId;
    this.videoId     = videoJSON.videoCode;
    this.title       = videoJSON.videoName;
    this.description = videoJSON.description;
    this.point       = videoJSON.point;
    this.view        = videoJSON.numberOfView;
    this.thumbnails  = this.genThumbnails();
    this.duration    = null;
    this.numberOfComment = 0;
  }

  Video.find = function (id) {
    return Video.allInHash().then(function(videos) {
      return videos[id];
    });
  };

  Video.all = function () {
    return VideoService.all().then(function(response) {
      return response.map(function (videoJSON) {
        return new Video(videoJSON);
      }).sort(function (video1, video2) {
        return video1.createAt < video2.createAt;
      });
    });
  };

  Video.mostViewed = function (limit) {
    return Video.all().then(function (response) {
      return response.sort(function(video1, video2) {
        return video1.view - video2.view;
      }).slice(0, limit);
    });
  };

  Video.allInHash = function () {
    return Video.all().then(function(response) {
      var hash = {};
      response.forEach(function (video) {
        hash[video.id] = video;
      });
      return hash;
    });
  };

  Video.limitedPlaylistIncludes = function (id) {
    return Video.allInHash().then(function (allVideos) {
      ids = Object.keys(allVideos);
      index = ids.indexOf(id);
      limitedIds = ids.slice(index - 10 > 0 ? index - 10 : 0,
                             index + 10 < ids.length ? index + 10 : ids.length);
      return _.pick(allVideos, limitedIds);
    });
  };

  Video.limitGetVideos = function (start, number) {
    return Video.allInHash().then(function (allVideos) {
      ids = Object.keys(allVideos);
      index = ids.indexOf(id);
      limitedIds = ids.slice(index - 10 > 0 ? index - 10 : 0,
                             index + 10 < ids.length ? index + 10 : ids.length);
      return _.pick(allVideos, limitedIds);
    });
  };

  Video.prototype.update = function (videoData) {

  };

  Video.prototype.comments = function () {
    var defer = defer || $q.defer();
    $http.get(beertubeAPI.URL + '/videos/getAllCommentByVideoId/' + this.id).then(
      function (response) {
        var comments = response.data.data;
        defer.resolve(comments.sort(function(cmt1, cmt2) {return cmt1.createAt <= cmt2.createAt;})
                              .map(function(comment) {
          return new VideoComment(comment);
        }));
      },
      function (response) { defer.reject(response); }
    );
    return defer.promise;
  };

  Video.prototype.commentCount = function () {
    return this.comments().then(function (comments) {
      return comments.length;
    });
  };

  Video.prototype.videoYoutubeData = function () {
    return VideoService.videoYoutubeData(this.videoId);
  };

  Video.prototype.setDuration = function (ptDuration) {
    secs = moment.duration(ptDuration).asSeconds();
    if (secs < 60) {
      this.duration = moment.duration(secs, 'seconds').format('mm:ss', {trim: false});
    } else {
      this.duration = moment.duration(secs, 'seconds').format('d[d] h:mm:ss');
    }
  };

  Video.prototype.genThumbnails = function () {
    var base = 'https://i.ytimg.com/vi/';
    var extension = '.jpg';
    var types = ['0', '1', '2', '3', 'default', 'hqdefault', 'mqdefault',
                 'maxresdefault'];
    var thumbnails = {};
    var videoId = this.videoId;
    types.forEach(function(type) {
      thumbnails[type] = base + videoId + '/' + type + extension;
    });
    return thumbnails;
  };

  return Video;
});
