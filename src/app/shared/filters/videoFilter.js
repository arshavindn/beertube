'use strict';

var videoFilter = angular.module('videoFilter', []);

videoFilter.filter('trusted', ['$sce', function ($sce) {
  return function (url) {
    return $sce.trustAsResourceUrl(url);
  };
}]);