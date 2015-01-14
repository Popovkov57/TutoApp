var serviceApp = angular.module('serviceApp', ['ionic']);

var users = [];

serviceApp.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {

    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider) {
  $stateProvider
  .state('home', {
    url: '/users',
    templateUrl: 'home.html',
    controller: 'usersCtrl'
  })
  .state('userview', {
    url: '/user/:id',
    templateUrl: 'userview.html',
    controller: 'userCtrl'
  });
})

serviceApp.factory('Users',function($http, $q, $stateParams) {

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

    var addUser = function(){
      getOneRandomUser().then(function(user){
        users.unshift(user);
      }, function(msg){
        alert(msg);
      });
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
          //delete users[i];
          users.splice(i,1);
        }
      }
      console.log(users);
    }

    return {
      addUser: addUser,
      getList: getList,
      getUser: getUser,
      deleteUser: deleteUser
    }
});

serviceApp.controller('usersCtrl', function($scope, Users, $ionicLoading, $stateParams){

    $ionicLoading.show({
      template: 'Loading...'
    });

    Users.getList().then(function(users){
      $scope.users = users;
      $ionicLoading.hide();

    }, function(msg){
      alert(msg);
    });

    $scope.add = function(){
      Users.addUser();
    }

    $scope.refresh = function(){
      $ionicLoading.show();
      Users.getList().then(function(users){
        $scope.users = users;
        $ionicLoading.hide();

      }, function(msg){
        alert(msg);
      });
      $scope.$broadcast('scroll.refreshComplete');
    }

    $scope.delete = function(id){
      Users.deleteUser(id);
    }

});

serviceApp.controller('userCtrl', function($scope, Users, $stateParams){
  $scope.user = Users.getUser($stateParams.id);
})
