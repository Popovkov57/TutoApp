// Ionic Starter App


var serviceApp = angular.module('serviceApp', ['ionic']);

var users = [];

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
    
    
    
    var init = function(){ 
        // load 5 ramdom person 
     $http.get('http://api.randomuser.me/?results=5').success(function(data){
            users = data;
         for(var i=0; i<data.results.length; i++){
             
            /*console.log("firstname: " + data.results[i].user.name.first
                       + " lastname: " + data.results[i].user.name.last
                       + " adress: " + data.results[i].user.location.city + " " + data.results[i].user.location.street
                       );*/
             
             users = {firstname:data.results[i].user.name.first,
                 lastname:data.results[i].user.name.last,
                 email:data.results[i].user.email,
                 city:data.results[i].user.location.city,
                 street:data.results[i].user.location.street};
         }
        
         console.log(users);
        });
    }
    
    var getList = function() {
        //if(users!=[]){
            console.log(users);
            return users;
        //}
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
