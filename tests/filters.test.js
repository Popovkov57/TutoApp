describe('fullName Filter test', function() {
  // Load the module seviceApp
  beforeEach(module('serviceApp'));

  it('display fullname if firstName and lastName are not null', inject(function($filter){
    var user={
      "firstname": "Max",
      "lastname": "Lafarce",
      "email":"max@gmail.com"
    };
    var fullName = $filter('fullName');
    expect(fullName(user)).toEqual(user.firstname + ' ' + user.lastname);
  }));


  it('display email if firstname and lastname are null', inject(function($filter){
    var user={
      "firstname": "",
      "lastname": "",
      "email":"max@gmail.com"
    };
    var fullName = $filter('fullName');
    expect(fullName(user)).toEqual(user.email);
  }));


  it('display anonymous if firstname, lastname and email are null', inject(function($filter){
    var user={
      "firstname":"",
      "lastname":"",
      "email": ""
    };
    var fullName = $filter('fullName');
    expect(fullName(user)).toEqual("anonymous");
  }));


  it('display firstname if lastname is null', inject(function($filter){
    var user={
      "firstname": "Max",
      "lastname": "",
      "email":"max@gmail.com"
    };
    var fullName = $filter('fullName');
    expect(fullName(user)).toEqual(user.firstname);
  }));

  it('display lastname if first is null', inject(function($filter){
    var user={
      "firstname": "",
      "lastname": "Lafarce",
      "email":"max@gmail.com"
    };
    var fullName = $filter('fullName');
    expect(fullName(user)).toEqual(user.lastname);
  }));

})
