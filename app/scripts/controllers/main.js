'use strict';

/**
 * @ngdoc function
 * @name angularMeetupApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularMeetupApp
 */
angular.module('angularMeetupApp')
  .controller('MainCtrl', function ($scope, $http, lastFmCreds, topChartsService) {
    topChartsService.getTopArtists();

    $scope.$watch(function() {
      return topChartsService.data;
    }, function(data) {
      if(typeof data !== 'undefined') {
        console.log(data);
        $scope.topartists = data.topartists.artist;
      }
    });

    var params = {
        method: 'user.getInfo',
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
              $scope.user = data.user;
            }
        })
        .error(function (data, status) {
            $scope.error = data || 'Req is hosed';
        });
  });
