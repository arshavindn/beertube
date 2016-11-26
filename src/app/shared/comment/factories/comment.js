angular.module('beertube.comment').factory('VideoComment', function($q, $http, beertubeAPI, User) {
  function VideoComment(commentJSON) {
    this.id = commentJSON.commentId;
    this.content = commentJSON.content;
    this.postDateTime = commentJSON.createAt;
    this.user = new User(commentJSON.commentor);
  }

  VideoComment.prototype.humanizePostTime = function () {
    return moment(this.postDateTime).fromNow();
  };

  VideoComment.create = function (token, videoId, content) {
    var defer = $q.defer();
    $http.post(beertubeAPI.URL + '/videos/comment/' + videoId, {content: content}, {Authorization: token}).then(
      function (response) { defer.resolve(new VideoComment(response.data.data)); },
      function (response) { defer.reject(response); }
    );
    return defer.promise;
  };

  return VideoComment;
});
