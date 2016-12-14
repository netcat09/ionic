/**
 * Created by netcat on 13.12.16.
 */
angular.module('starter.services', [])

.service('API', function ($http, $q, apiKeys, youtubeFactory) {
  return {
    getMostPopularVideos: function () {
      var d = $q.defer();
      $http({
        method: 'GET',
        url: 'https://www.googleapis.com/youtube/v3/videos',
        params:{
          part: 'snippet',
          key : apiKeys.youtube,
          chart: 'mostPopular',
          maxResults: 50
        }
      }).then(function (data) {
        var y_videos = data.data.items;
        var my_videos = youtubeFactory.convertYoutubeToTemplate(y_videos);
        d.resolve(my_videos);
      });
      return d.promise

    },
    searchVideos: function (params) {
      var d = $q.defer();
      $http({
        method: 'GET',
        url: 'https://www.googleapis.com/youtube/v3/search',
        params:{
          part: 'snippet',
          key : apiKeys.youtube,
          maxResults: 5,
          q: params.query
          }
      }).then(function (data) {
        var y_videos = data.data.items;
        var my_videos = youtubeFactory.convertYoutubeToTemplate(y_videos);
        d.resolve(my_videos);
      });
      return d.promise

    }
  }
})

.constant('apiKeys', {
  youtube: 'AIzaSyALTCWvsRUOF9yCXf5Er8OPYH-y5a7kPUY'
})

.factory('youtubeFactory', function () {
  return {
    convertYoutubeToTemplate: function (videos) {
      return videos.map(function (video, index) {
        return {
          title: video.snippet.title,
          id: video.id,
          description: video.snippet.description,
          image: video.snippet.thumbnails.medium.url,
          date: video.snippet.publishedAt,
          author: video.snippet.channelTitle,
          sid: video.id.playlistId
        }
      });

    }
  }
});
