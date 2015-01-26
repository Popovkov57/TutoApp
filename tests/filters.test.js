// Unit tests to verify if the filter work
describe('fullName Filter test', function() {
  // Load the module seviceApp
  beforeEach(module('serviceApp'));

  var fullName, user;

  // before each test we load the fullname filter and create an user
  beforeEach(inject(function($filter){
    fullName = $filter('fullName');
    user = {
      "firstname": "Max",
      "lastname": "Lafarce",
      "email":"max@gmail.com"
    };
  }));

  it('display fullname if firstName and lastName are not empty', inject(function($filter){
    expect(fullName(user)).toEqual("Max Lafarce");
  }));

  it('display firstname if lastname is empty', inject(function($filter){
    user.lastname = "";
    expect(fullName(user)).toEqual("Max");
  }));

  it('display email if firstname and lastname are empty', inject(function($filter){
    user.firstname = "";
    user.lastname = "";
    expect(fullName(user)).toEqual("max@gmail.com");
  }));

  it('display lastname if firstname is empty', inject(function($filter){
    user.firstname = "";
    expect(fullName(user)).toEqual("Lafarce");
  }));

  it('display anonymous if firstname, lastname and email are empty', inject(function($filter){
    user.email = "";
    user.firstname = "";
    user.lastname = "";
    expect(fullName(user)).toEqual("anonymous");
  }));

})
