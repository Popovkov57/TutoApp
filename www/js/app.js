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

serviceApp.factory('Users',function($http) {

    var users = [];
    var user;

    var init = function(){

        $http.get('http://api.randomuser.me/?results=5').success(function(data){

            for(var i=0; i<data.results.length; i++){

                var tempUser = data.results[i].user;

                users[i]={"firstname": tempUser.name.first,
                "lastname": tempUser.name.last,
                "avatarURL": tempUser.picture.thumbnail,
                "city": tempUser.location.city,
                "street": tempUser.location.street
                };
            };
        });

    }

    var add = function($scope){
      $scope.push = function() {
        users.push(getOneRandomUser());
      }
    }

    var getOneRandomUser = function(){
      $http.get('http://api.randomuser.me/?results=1').success(function(data){
        var tempUser = data.results[0].user;
        user = {"firstname": tempUser.name.first,
        "lastname": tempUser.name.last,
        "avatarURL": tempUser.picture.thumbnail,
        "city": tempUser.location.city,
        "street": tempUser.location.street
        };
      });

      return user;

    }

    var getList = function() {
      return users;
    }

    return {
        init: init,
        add: add,
        getList: getList
    }
});

serviceApp.controller('usersCtrl', function($scope, Users){
    Users.init();
    $scope.users = Users.getList();
    Users.add($scope);
});
