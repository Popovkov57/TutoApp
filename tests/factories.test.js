describe('Users', function(){
  var httpMock, http, users, timeout;

  // simulate data from the random user API
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

  // simulate the data of a user
  var dataOut = {
    firstname: 'lois',
    lastname: 'williams',
    email: 'lois.williams50@example.com',
    avatarURL: 'http://api.randomuser.me/portraits/thumb/women/55.jpg',
    city: 'frederick',
    street: '1969 elgin st',
    id: 'graywolf' };

  // url of the random user API
  var url="http://api.randomuser.me/?results=5";
  var url1="http://api.randomuser.me/?results=1";


  // before each test we load the factory and the httpBackend service
  beforeEach(module('serviceApp.factories'));

  beforeEach(inject(function ($httpBackend, Users) {
    httpMock = $httpBackend;
    factory = Users;
  }));

  // --------------------- Methode getList() --------------------- //

  it("return 5 users if API responce is ok", function () {
    httpMock.expectGET(url).respond({
      results : dataIn
    });
    factory.getList().then(function(users){
      expect(users).toEqual([dataOut]);
    });
    // flush response
    httpMock.flush();
  });


  it("return [] if API responce is nok", function () {

    httpMock.expectGET(url).respond({
      results : []
    });
    factory.getList().then(function(users){
      expect(users).toEqual([]);
    });
    // flush response
    httpMock.flush();
  });


  // --------------------- Methode addList(user) --------------------- //

  it("verify new array length is greater than old array", function () {
    httpMock.expectGET(url).respond({
      results : dataIn
    });
    factory.getList().then(function(users){
      factory.addUser(dataOut)
      expect(users.length).toEqual(2);
    });
    // flush response
    httpMock.flush();
  });

  // --------------------- Methode getUserById() --------------------- //

  it("display user if his id is not empty", function () {
    httpMock.expectGET(url).respond({
      results : dataIn
    });
    factory.getList().then(function(users){
      expect(factory.getUserById("graywolf")).toEqual(dataOut);
    });
    // flush response
    httpMock.flush();
  });

  it("return null if id is empty", function () {
    httpMock.expectGET(url).respond({
      results : dataIn
    });
    factory.getList().then(function(users){
      expect(factory.getUserById(null)).toEqual(null);
    });
    // flush response
    httpMock.flush();
  });

  // --------------------- Methode deleteUserById(id) --------------------- //

  it("verify new array length is lesser than old array", function () {
    httpMock.expectGET(url).respond({
      results : dataIn
    });
    factory.getList().then(function(users){
      factory.deleteUserById("graywolf")
      expect(users).toEqual([]);
    });
    // flush response
    httpMock.flush();
  });


  it("does nothing if id is empty", function () {
    httpMock.expectGET(url).respond({
      results : dataIn
    });
    factory.getList().then(function(users){
      factory.deleteUserById()
      expect(users).toEqual(users);
    });
    // flush response
    httpMock.flush();
  });

  // --------------------- Methode getOneRandomUser() --------------------- //

  it("display user if API responce is ok", function () {
    httpMock.expectGET(url1).respond({
      results : dataIn
    });
    factory.getOneRandomUser().then(function(users){
      expect(users.length).toEqual(1);
    });
    // flush response
    httpMock.flush();
  });

  it("return [] if API responce is nok", function () {
    httpMock.expectGET(url1).respond({
      results : []
    });
    factory.getOneRandomUser().then(function(users){
      expect(users).toEqual([]);
    });
    // flush response
    httpMock.flush();
  });




});
