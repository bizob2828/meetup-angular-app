'use strict';

/**
 * @ngdoc function
 * @name angularMeetupApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularMeetupApp
 */
angular.module('angularMeetupApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
