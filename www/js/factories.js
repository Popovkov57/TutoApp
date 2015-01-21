angular.module('serviceApp.factories', [])

.factory('Users',function($http, $q) {

  var users = [];
  var tempUsers = [];
  var user;

  var _performHttpRequestForUsers = function(count) {
    var deffered = $q.defer();

    _resetUsersList();

    url = "http://api.randomuser.me/?results=";
    url += count;

    $http.get(url)
    .success(function(data, status){
      for(var i=0; i<data.results.length; i++){
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

  var getOneRandomUser = function(){

    var deffered = $q.defer();
    _performHttpRequestForUsers(1).then(function(tempUsers){
      deffered.resolve(tempUsers);
    }, function(msg){
      deffered.reject(msg);
    });
    return deffered.promise;
  }

  var addUser = function(user){
    users.unshift(user);
  }

  var _resetUsersList = function(){
    tempUsers = [];
  }

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
