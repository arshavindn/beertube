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

angular.module('beertube').constant('BASE_URL', 'https://youtube.com/');
