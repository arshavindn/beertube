'use strict';

angular.module('beertube', [
  'ngRoute',
  'ngResource',
  'ngAnimate',
  'ngSanitize',
  'ngCookies',
  'ui.bootstrap',
  'beertube.video',
  'beertube.home',
  'beertube.login',
  'beertube.watch'
]);

angular.module('beertube').run(function () {
  var tag = document.createElement('script');
  tag.src = "http://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
});
