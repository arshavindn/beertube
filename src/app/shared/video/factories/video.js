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
    var videoJSON = VideoService.find(id);
    return new Video(videoJSON);
  };

  Video.all = function () {
    var allVideosInJSON = VideoService.all();
    var videos = [];
    angular.forEach(allVideosInJSON, function (videoJSON) {
      videos.push(new Video(videoJSON));
    });
  };

  Video.prototype.update = function (videoData) {

  };

  Video.prototype.genThumbnails = function () {
    var base = 'https://i.ytimg.com/vi/';
    var extension = '.jpg';
    var types = ['0', '1', '2', '3', 'default', 'hqdefault', 'mqdefault',
                 'maxresdefault'];
    var thumbnails = {};
    angular.forEach(types, function(type) {
      thumbnails[type] = base + this.videoId + '/' + type + extension;
    });
    return thumbnails;
  };

  return Video;
});
