angular.module('beertube')
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        controller: 'HomeCtrl',
        templateUrl: 'app/components/home/views/home.html',
      })
      .when('/login', {
      	templateUrl: 'app/components/login/views/login.html',
      	controller: 'LoginCtrl'
      })
      .when('/watch/:id', {
        templateUrl: 'app/components/watch/views/watch.html',
        controller: 'WatchCtrl'
      })
      .when('/video/:videoId/edit', {
        templateUrl: 'app/components/videoUpdate/views/videoUpdate.html',
        controller: 'VideoUpdateCtrl'
      })
      .when('/register', {
        templateUrl: 'app/components/register/views/register.html',
        controller: 'RegisterCtrl'
      })
      .when('/user/:userId/profile', {
        templateUrl: 'app/components/profile/views/profile.html',
        controller: 'ProfileCtrl'
      })
      .when('/user/:userId/password', {
        templateUrl: 'app/components/password/views/password.html',
        controller: 'PasswordCtrl'
      })
      .when('/user/:userId/favorite', {
        templateUrl: 'app/components/favorite/views/favorite.html',
        controller: 'FavoriteCtrl'
      })
      .when('/user/:userId', {
        templateUrl: 'app/components/information/views/information.html',
        controller: 'InformationCtrl'
      })
      .when('/upload', {
        templateUrl: 'app/components/upload/views/upload.html',
        controller: 'UploadCtrl'
      })
      .when('/admin/users', {
        templateUrl: 'app/components/admin/views/userManager.html',
        controller: 'UserManagerCtrl'
      })
      .when('/admin/categories', {
        templateUrl: 'app/components/admin/views/categoryManager.html',
        controller: 'CategoryManagerCtrl'
      });
  }])
  .config( function ($httpProvider) {
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
  });
