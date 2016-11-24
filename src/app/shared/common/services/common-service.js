angular.module('beertube.common').service('CommonService', function ($route) {
  var service = this;

  service.routePath = function () {
    return $route.current.originalPath;
  }
});
