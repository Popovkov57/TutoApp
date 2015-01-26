
angular.module('serviceApp', ['ionic', 'serviceApp.factories'])

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

// To route the app view
.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('users')
  $stateProvider
  .state('/', {
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
