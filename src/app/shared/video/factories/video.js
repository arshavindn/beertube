angular.module('beertube.video').factory('Video', function (VideoService) {
  function Video(videoJSON) {
    this.id          = videoJSON.id;
    this.videoId     = videoJSON.videoId;
    this.title       = videoJSON.title;
    this.description = videoJSON.description;
    this.point       = videoJSON.point;
    this.view        = videoJSON.view;
    this.thumbnails  = this.genThumbnails();
    this.duration    = null;
  }

  Video.find = function (id) {
    return Video.allInHash()[id];
  };

  Video.all = function () {
    var allVideosInJSON = VideoService.all();
    return allVideosInJSON.map(function (videoJSON) {
      return new Video(videoJSON);
    });
  };

  Video.allInHash = function () {
    var allVideosInJSON = VideoService.all();
    var hash = {};
    allVideosInJSON.forEach(function (videoJSON) {
      hash[videoJSON.id] = new Video(videoJSON);
    });
    return hash;
  };

  Video.mostViewed = function () {
    var videos = VideoService.mostViewed();
    return videos.map(function(videoData) { return new Video(videoData); });
  };

  Video.limitedPlaylistIncludes = function (id) {
    var allVideos = Video.allInHash();
    ids = Object.keys(allVideos);
    index = ids.indexOf(id);
    limitedIds = ids.slice(index - 10 > 0 ? index - 10 : 0,
                           index + 10 < ids.length ? index + 10 : ids.length)
    return _.pick(allVideos, limitedIds);
  }

  Video.prototype.update = function (videoData) {

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
    };
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
