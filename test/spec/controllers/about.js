'use strict';

describe('Controller: AboutCtrl', function () {

  // load the controller's module
  beforeEach(module('angularMeetupApp'));

  var AboutCtrl
    , httpBackend
    , controller
    , scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, _$rootScope_, _$httpBackend_) {
    scope = _$rootScope_;
    httpBackend = _$httpBackend_;
    controller = $controller;
  }));

  it('should set songs according to response from API', function () {
    httpBackend.when('GET', 'http://ws.audioscrobbler.com/2.0/?api_key=a0c1594052516ddafa161aa969e52e20&format=json&limit=12&method=user.getrecenttracks&user=bizob2828').respond({ recenttracks: {track: 'hi'}});
    AboutCtrl = controller('AboutCtrl', {
      $scope: scope
    });
    scope.recentTracks();
    httpBackend.flush();
    expect(scope.songs).to.equal('hi');
  });

  it('should set error when it is returned', function () {
    httpBackend.when('GET', 'http://ws.audioscrobbler.com/2.0/?api_key=a0c1594052516ddafa161aa969e52e20&format=json&limit=12&method=user.getrecenttracks&user=bizob2828').respond({ error: 6, message: 'your error'});
    AboutCtrl = controller('AboutCtrl', {
      $scope: scope
    });
    scope.recentTracks();
    httpBackend.flush();
    expect(scope.error).to.equal('your error');
  });

  it('should set error when api call fails', function () {
    httpBackend.when('GET', 'http://ws.audioscrobbler.com/2.0/?api_key=a0c1594052516ddafa161aa969e52e20&format=json&limit=12&method=user.getrecenttracks&user=bizob2828').respond(500, 'api call failed');
    AboutCtrl = controller('AboutCtrl', {
      $scope: scope
    });
    scope.recentTracks();
    httpBackend.flush();
    expect(scope.error).to.equal('api call failed');
  });

  it('should default error when api responds with nothing', function () {
    httpBackend.when('GET', 'http://ws.audioscrobbler.com/2.0/?api_key=a0c1594052516ddafa161aa969e52e20&format=json&limit=12&method=user.getrecenttracks&user=bizob2828').respond(500, undefined);
    AboutCtrl = controller('AboutCtrl', {
      $scope: scope
    });
    scope.recentTracks();
    httpBackend.flush();
    expect(scope.error).to.equal('Req is hosed');
  });

});
