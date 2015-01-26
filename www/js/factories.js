angular.module('serviceApp.factories', [])

.factory('Users',function($http, $q) {

  var users = [];
  var tempUsers = [];
  var user;

  // to load n user from API Random user with a HTTP request GET
  // and to put data in users list
  var _performHttpRequestForUsers = function(n) {
    var deffered = $q.defer();

    _resetUsersList();

    url = "http://api.randomuser.me/?results=";
    url += n;

    $http.get(url)
    .success(function(data, status){
      for(var i=0; i<data.results.length; i++){
        //To get user with his info and put it in the users list
        var tempUser = data.results[i].user;
        tempUsers[i]={
          "firstname": tempUser.name.first,
          "lastname": tempUser.name.last,
          "email": tempUser.email,
          "avatarURL": tempUser.picture.thumbnail,
          "city": tempUser.location.city,
          "street": tempUser.location.street,
          "id": data.results[i].seed
        };
      };
      deffered.resolve(tempUsers);
    })
    .error(function(data, status){
      deffered.reject("Impossible de récupérer les données");
    });
    return deffered.promise;
  };

  // To receive a list of 5 random users
  var getList = function(){
    var deffered = $q.defer();
    _performHttpRequestForUsers(5).then(function(tempUsers){
      users = tempUsers;
      deffered.resolve(users);
    }, function(msg){
      deffered.reject(msg);
    });
    return deffered.promise;
  }

  // To receive a list of one user
  var getOneRandomUser = function(){

    var deffered = $q.defer();
    _performHttpRequestForUsers(1).then(function(tempUsers){
      deffered.resolve(tempUsers);
    }, function(msg){
      deffered.reject(msg);
    });
    return deffered.promise;
  }

  // To add a random user in the users list
  var addUser = function(user){
    users.unshift(user);
  }

  // To reset the users list when i do a pull to refresh
  var _resetUsersList = function(){
    tempUsers = [];
  }

  // To get an user from the users list with his id
  var getUserById = function(id){
    for(i=0; i<users.length; i++){
      if(users[i].id == id){
        user = users[i];
        return user;
      }else{
        return null;
      }
    }
  }

  // To delete an user from the users list with his id
  var deleteUserById = function(id){
    for(i=0; i<users.length; i++){
      if(users[i].id == id){
        users.splice(i,1);
        return;
      }
    }
  }

  return {
    addUser: addUser,
    getList: getList,
    getUserById: getUserById,
    deleteUserById: deleteUserById,
    getOneRandomUser: getOneRandomUser
  }
});
