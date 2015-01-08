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

serviceApp.factory('Users', function($http) {
    
    var users = [];
    
    var init = function(){ 
        // load 5 ramdom person 
     $http.get('http://api.randomuser.me/?results=5').success(function(data){
            users = data;
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
    console.log("hello world");
    
    Users.init();
    $scope.users = Users.getList();
    
    
});   
