describe('Users', function(){
  var httpMock, users, timeout;
  var data = [];

  beforeEach(module('serviceApp.factories'));

  beforeEach(inject(function ($httpBackend, Users, $timeout) {
    httpMock = $httpBackend;
    users = Users;
    timeout = $timeout;
  }));

  it("should get users from API", function () {

    httpMock.expectGET("http://api.randomuser.me/?results=5").respond({
      results: data
    });

    users.getList().then( function(users){
      expect(users).toEqual([]);
    });

    // execut all now 
    httpMock.flush();
  });
});
