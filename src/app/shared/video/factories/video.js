angular.module('beertube.video').factory('Video', function (VideoService) {
  function Video(videoJSON) {
    this.id          = videoJSON.id;
    this.videoId     = videoJSON.videoId;
    this.title       = videoJSON.title;
    this.description = videoJSON.description;
    this.point       = videoJSON.point;
    this.view        = videoJSON.view;
    this.thumbnails  = this.genThumbnails();
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

  Video.prototype.update = function (videoData) {

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
