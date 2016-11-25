angular.module('beertube.comment').factory('VideoComment', function(User) {
  function VideoComment(commentJSON) {
    this.id = commentJSON.commentId;
    this.content = commentJSON.content;
    this.postDateTime = commentJSON.createAt;
    this.user = new User(commentJSON.commentor);
  }

  VideoComment.prototype.humanizePostTime = function () {
    return moment(this.postDateTime).fromNow();
  };

  return VideoComment;
});
