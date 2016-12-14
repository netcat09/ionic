angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
})

.controller('PlaylistsCtrl', function($scope, API, $ionicModal, $sce) {
  $ionicModal.fromTemplateUrl('templates/video-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.videos =[];
 API.getMostPopularVideos().then(function (data) {

   $scope.videos = data;
 });
  $scope.openVideo = function (video) {
    $scope.modal.show();
    $scope.video = video;
    $scope.url = $sce.trustAsResourceUrl('https://www.youtube.com/embed/' + video.id)
  };
  $scope.close = function () {
    $scope.modal.hide();
  }

})

.controller('SearchCtrl', function($scope, API, $ionicModal, $sce) {
  $ionicModal.fromTemplateUrl('templates/video-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.searched =[];
  $scope.searchSettings = {
    query: null,
    regions: 'US'
  };


  $scope.searchVideos = function () {
    API.searchVideos($scope.searchSettings).then(function (data) {
      console.log(data);
      $scope.videos = data;
    });

    $scope.openVideo = function (video) {
      $scope.modal.show();
      $scope.video = video;
      $scope.url = $sce.trustAsResourceUrl('https://www.youtube.com/embed/' + video.id.videoId)
    };
    $scope.close = function () {
      $scope.modal.hide();
    }
  }
  })






.controller('PlaylistCtrl', function($scope, $stateParams) {

});




