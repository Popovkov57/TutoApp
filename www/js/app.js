angular.module('serviceApp', ['ionic'])

.run(function($ionicPlatform) {
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
  .state('users', {
    url: '/users',
    templateUrl: 'templates/users.html',
    controller:'usersCtrl'
  })
  .state('user', {
    url: '/user/:id',
    templateUrl: 'templates/user.html',
    controller: 'userCtrl'
  });
})
