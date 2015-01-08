// Ionic Starter App


var serviceApp = angular.module('serviceApp', ['ionic']);

serviceApp.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

serviceApp.factory('Users', function() {
    
    var users = [
        {
                "fullName" : "Max",
                "adress" : "Paris",
                "avatarURL" : "photo_1.jpg"
            },
            {
                "fullName" : "Toto",
                "adress" : "Metz",
                "avatarURL" : "photo_2.jpg"
            }
 
    ];
    
    var init = function($http){
       // $http.get('http://api.randomuser.me/').success(function(data){
    //    });
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
    console.log("hello world");
    
    $scope.users = Users.getList();
});   
