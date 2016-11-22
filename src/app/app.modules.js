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
  'beertube.navbar',
  'beertube.login',
  'beertube.watch',
  'beertube.register',
  'beertube.profile',
  'beertube.password',
  'beertube.favorite',
  'beertube.information',
  'beertube.upload',
  'beertube.video',
  'videoFilter'
]);

angular.module('beertube').constant('youtubeAPI', {
  URL: 'https://www.googleapis.com/youtube/v3/videos',
  KEY: 'AIzaSyAcSQzuOGWIxeyak4v2YYX4vZS4h-_K6KM',
  PART: ['contentDetails', 'statistics']
});
