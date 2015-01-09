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

serviceApp.factory('Users', function($http) {
    
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
    
    var getList = function() {
        return users;
    }
    
    return {
        init: init,
        getList: getList
    }
});

serviceApp.controller('serviceAppController', function($scope, Users){
    Users.init();
    $scope.users = Users.getList();
});   
