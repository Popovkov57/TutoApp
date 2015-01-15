angular.module('serviceApp')

.factory('Users',function($http, $q, $stateParams) {

  var users = [];
  var user;

  var getList = function(){

    var deffered = $q.defer();

    users =[];

    $http.get('http://api.randomuser.me/?results=5')
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
  }

  var getOneRandomUser = function(){

    var deffered = $q.defer();

    $http.get('http://api.randomuser.me/?results=1')
    .success(function(data, status){
      var tempUser = data.results[0].user;
      user = {
        "firstname": tempUser.name.first,
        "lastname": tempUser.name.last,
        "avatarURL": tempUser.picture.thumbnail,
        "city": tempUser.location.city,
        "street": tempUser.location.street,
        "id": data.results[0].seed
      };
      deffered.resolve(user);

    })
    .error(function(data, status){
      deffered.reject("Immpossible de récupérer les données");
    });
    return deffered.promise;
  }

  var addUser = function(user){
    users.unshift(user);
  }

  var getUser = function(id){
    for(i=0; i<users.length; i++){
      if(users[i].id == id){
        user = users[i];
        return user;
      }
    }
  }

  var deleteUser = function(id){
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
    getUser: getUser,
    deleteUser: deleteUser,
    getOneRandomUser: getOneRandomUser
  }
});
