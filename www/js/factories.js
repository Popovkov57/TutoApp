angular.module('serviceApp')

.factory('Users',function($http, $q, $stateParams) {

  var users = [];
  var user;

  var performHttpRequestForUsers = function(count) {
    var deffered = $q.defer();
    users =[];
    url = "http://api.randomuser.me/?results=";
    url += count;

    $http.get(url)
    .success(function(data, status){
      for(var i=0; i<data.results.length; i++){
        var tempUser = data.results[i].user;
        users[i]={
          "firstname": tempUser.name.first,
          "lastname": tempUser.name.last,
          "avatarURL": tempUser.picture.thumbnail,
          "city": tempUser.location.city,
          "street": tempUser.location.street,
          "id": data.results[i].seed
        };
      };
      deffered.resolve(users);
    })
    .error(function(data, status){
      deffered.reject("Impossible de récupérer les données");
    });
    return deffered.promise;
  };

  var getList = function(){
    var deffered = $q.defer();
    performHttpRequestForUsers(5).then(function(users){
      deffered.resolve(users);
    }, function(msg){
      deffered.reject(msg);
    })
    return deffered.promise;
  }

  var getOneRandomUser = function(){

    var deffered = $q.defer();
    performHttpRequestForUsers(1).then(function(users){
      deffered.resolve(users);
    }, function(msg){
      deffered.reject(msg);
    })
    return deffered.promise;
  }

  var addUser = function(user){
    users.unshift(user);
  }

  var getUserById = function(id){
    for(i=0; i<users.length; i++){
      if(users[i].id == id){
        user = users[i];
        return user;
      }
    }
  }

  var deleteUserById = function(id){
    for(i=0; i<users.length; i++){
      if(users[i].id == id){
        users.splice(i,1);
        break;
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
