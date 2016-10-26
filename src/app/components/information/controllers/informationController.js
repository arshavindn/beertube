'use strict';

angular.module('beertube.information').controller('InformationCtrl', ['$scope', 
  function ($scope) {
    $scope.name = "Le Quang Canh";
    $scope.numOfVideo = 8;
    $scope.numOfFV = 10;
    $scope.avatarUrl = "http://corsi.corley.it/angularjs-logo.png";
    $scope.dayJoin = "22/2/2016";

    $scope.videos = [
      {
        videoId: 1,
        videoName: "Pho Khong Mua",
        videoUrl: "https://www.youtube.com/embed/HuDm5uuS8c8",
        videoImage: "http://img.youtube.com/vi/HuDm5uuS8c8/mqdefault.jpg",
        numOfView: 20,
        numOfLike: 10,
        numOfComment: 11,
        dayOfCreate: "12/10/2016",
      },
      {
      	videoId: 2,
      	videoName: "Em Oi Ha Noi Pho",
      	videoUrl: "https://www.youtube.com/embed/NpqGtlhzjVo",
      	videoImage: "http://img.youtube.com/vi/NpqGtlhzjVo/mqdefault.jpg",
      	numOfView: 30,
      	numOfLike: 10,
      	numOfComment: 12,
      	dayOfCreate: "20/10/2016",
      },
      {
        videoId: 3,
        videoName: "Hoa Ban Trang - Buc Tuong",
        videoUrl: "https://www.youtube.com/embed/VioTZBzwRIQ",
        videoImage: "http://img.youtube.com/vi/VioTZBzwRIQ/mqdefault.jpg",
        numOfView: 100,
        numOfLike: 99,
        numOfComment: 50,
        dayOfCreate: "15/10/2016"
      }
    ];

    $scope.deleteVideo = function () {
      alert("OK");
    };
  }]);