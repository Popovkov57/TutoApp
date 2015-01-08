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

serviceApp.controller('serviceAppController', ['$scope', function($scope){
    console.log("hello world");
}])


// Service

var services = angular.module('services', []);

services.factory('ServiceController' [$scope, function($scope){
    
    var init = function(){
            
    }
}]
