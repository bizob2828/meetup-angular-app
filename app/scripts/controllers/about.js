'use strict';

/**
 * @ngdoc function
 * @name angularMeetupApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the angularMeetupApp
 */
angular.module('angularMeetupApp')
  .controller('AboutCtrl', function ($scope, $http) {
    var url = 'http://ws.audioscrobbler.com/2.0/';
        var params = {
            method: 'user.getrecenttracks',
            api_key: 'a0c1594052516ddafa161aa969e52e20',
            limit: 12,
            //user: 'bizob2828',
            user: 'bizob2828adfa',
            format: 'json'
        };
        $http.get(url, { params: params })
            .success(function (data) {
                if(data.error) {
                  $scope.error = data.message;
                } else {
                  $scope.songs = data.recenttracks.track;
                }
            })
            .error(function (data, status) {
                console.log(error);
                $scope.error = data || 'Req is hosed';
            });

  });
