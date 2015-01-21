describe('Users', function(){
  var httpMock, http, users, timeout;

  var dataIn = [{
    user: {
      gender: "female",
      name: {
        title: "ms",
        first: "lois",
        last: "williams"
      },
      location: {
        street: "1969 elgin st",
        city: "frederick",
        state: "delaware",
        zip: "56298"
      },
      email: "lois.williams50@example.com",
      username: "heavybutterfly920",
      password: "enterprise",
      salt: ">egEn6YsO",
      md5: "2dd1894ea9d19bf5479992da95713a3a",
      sha1: "ba230bc400723f470b68e9609ab7d0e6cf123b59",
      sha256: "f4f52bf8c5ad7fc759d1d4156b25a4c7b3d1e2eec6c92d80e508aa0b7946d4ba",
      registered: "1288182167",
      dob: "146582153",
      phone: "(555)-942-1322",
      cell: "(178)-341-1520",
      SSN: "137-37-8866",
      picture: {
        large: "http://api.randomuser.me/portraits/women/55.jpg",
        medium: "http://api.randomuser.me/portraits/med/women/55.jpg",
        thumbnail: "http://api.randomuser.me/portraits/thumb/women/55.jpg",
      },
      version: "0.4.1"
    },
    seed: "graywolf"
  }];

  var dataOut = [{
    firstname: 'lois',
    lastname: 'williams',
    email: 'lois.williams50@example.com',
    avatarURL: 'http://api.randomuser.me/portraits/thumb/women/55.jpg',
    city: 'frederick',
    street: '1969 elgin st',
    id: 'graywolf' }];

  var url="http://api.randomuser.me/?results=5";

  beforeEach(module('serviceApp.factories'));

  beforeEach(inject(function ($httpBackend, Users) {
    httpMock = $httpBackend;
    factory = Users;
  }));


  it("expects getList() return a list of user if API response is not empty ", function () {

    httpMock.expectGET(url).respond({
      results : dataIn
    });
    factory.getList().then(function(users){
      expect(users).toEqual(dataOut);
    });
    // flush response
    httpMock.flush();
  });

  it("expects getList() return [] of user if API response is empty ", function () {

    httpMock.expectGET(url).respond({
      results : []
    });
    factory.getList().then(function(users){
      expect(users).toEqual([]);
    });
    // flush response
    httpMock.flush();
  });

});
