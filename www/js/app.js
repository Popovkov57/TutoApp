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

    var init = function(){

        $http.get('http://api.randomuser.me/?results=5').success(function(data){

            for(var i=0; i<data.results.length; i++){

                var tempUser = data.results[i].user;

                users[i]=
                    {"firstname": tempUser.name.first,
                     "lastname": tempUser.name.last,
                     "avatarURL": tempUser.picture.thumbnail,
                     "city": tempUser.location.city,
                     "street": tempUser.location.street
                    };
            };

        });
    }



    var add = function($scope){

      var user ={"firstname": "Max",
      "lastname": "Lafarce",
      "avatarURL": "http://url.fr",
      "city": "New-York",
      "street": "N-Y street"
      };

      $scope.push = function() {
        console.log(user);

        users.push(user);
      }

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
