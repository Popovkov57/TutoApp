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

serviceApp.factory('Users',function($http, $ionicLoading) {

    var users = [];
    var user;

    $ionicLoading.show({
      template: 'loading'
    })

    var init = function(){

        $http.get('http://api.randomuser.me/?results=5').success(function(data){

            for(var i=0; i<data.results.length; i++){

                var tempUser = data.results[i].user;

                users[i]={
                  "firstname": tempUser.name.first,
                  "lastname": tempUser.name.last,
                  "avatarURL": tempUser.picture.thumbnail,
                  "city": tempUser.location.city,
                  "street": tempUser.location.street
                };
            };
        });

    }

    var getOneRandomUser = function(){
      $http.get('http://api.randomuser.me/?results=1').success(function(data){
        var tempUser = data.results[0].user;
        user = {
          "firstname": tempUser.name.first,
          "lastname": tempUser.name.last,
          "avatarURL": tempUser.picture.thumbnail,
          "city": tempUser.location.city,
          "street": tempUser.location.street
        };
      });

      return user;

    }

    var addUser = function(){
      if(typeof getOneRandomUser() != 'undefined'){
        users.push(getOneRandomUser());
      };
    }

    var getList = function() {
      return users;
    }

    var refreshList = function() {
      users.splice(0,users.length);
      init();

    }

    return {
        init: init,
        addUser: addUser,
        refreshList: refreshList,
        getList: getList
    }
});

serviceApp.controller('usersCtrl', function($scope, Users){
    Users.init();
    $scope.users = Users.getList();
    $scope.add = function(){
      Users.addUser();
    }
    $scope.refresh = function(){
      Users.refreshList();
    }
});
