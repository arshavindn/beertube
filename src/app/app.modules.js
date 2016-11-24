'use strict';

angular.module('beertube', [
  'ngRoute',
  'ngResource',
  'ngAnimate',
  'ngSanitize',
  'ngCookies',
  'ui.bootstrap',
  'underscore',
  'beertube.common',
  'beertube.video',
  'beertube.home',
  'beertube.login',
  'beertube.watch'
]);

angular.module('beertube').constant('youtubeAPI', {
  URL: 'https://www.googleapis.com/youtube/v3/videos',
  KEY: 'AIzaSyAcSQzuOGWIxeyak4v2YYX4vZS4h-_K6KM',
  PART: ['contentDetails', 'statistics']
});
angular.module('beertube').constant('beertubeAPI', {
  URL: 'http://videoservice-dinhphan.rhcloud.com'
});
