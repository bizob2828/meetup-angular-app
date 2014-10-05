'use strict';

/**
 * @ngdoc function
 * @name angularMeetupApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the angularMeetupApp
 */
angular.module('angularMeetupApp')
  .controller('AboutCtrl', function ($scope, $http, lastFmCreds) {
    var params = {
        method: 'user.getrecenttracks',
        api_key: lastFmCreds.apiKey,
        limit: 12,
        user: lastFmCreds.user,
        format: 'json'
    };
    $http.get(lastFmCreds.url, { params: params })
        .success(function (data) {
            if(data.error) {
              $scope.error = data.message;
            } else {
              $scope.songs = data.recenttracks.track;
            }
        })
        .error(function (data, status) {
            $scope.error = data || 'Req is hosed';
        });

  });
