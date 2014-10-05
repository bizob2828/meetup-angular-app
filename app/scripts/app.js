'use strict';

/**
 * @ngdoc overview
 * @name angularMeetupApp
 * @description
 * # angularMeetupApp
 *
 * Main module of the application.
 */
angular
  .module('angularMeetupApp', [
    'ngResource',
    'ngRoute',
    'ngSanitize'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .constant('lastFmCreds', {
    user: 'bizob2828',
    apiKey: 'a0c1594052516ddafa161aa969e52e20',
    url: 'http://ws.audioscrobbler.com/2.0/'
  })
  .factory('topChartsService', function($http, lastFmCreds) {
    var service = {};

    service.getTopArtists = function(cb) {
      var params = {
        method: 'user.getTopArtists',
        api_key: lastFmCreds.apiKey,
        limit: 12,
        user: lastFmCreds.user,
        format: 'json'
      };

      $http.get(lastFmCreds.url, { params: params })
          .success(function (data) {
            service.data = data;
          })
          .error(function (data, status) {
            service.error = data;
          });

      };
      return service;
  });

