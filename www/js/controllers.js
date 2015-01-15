angular.module('serviceApp')

.controller('usersCtrl', function($scope, Users, $ionicLoading, $stateParams, $ionicModal){

  $ionicLoading.show({
    template: 'Loading...'
  });

  Users.getList().then(function(users){
    $scope.users = users;
    $ionicLoading.hide();

  }, function(msg){
    alert(msg);
  });

  $scope.add = function(){
    Users.addUser();
  }

  $scope.refresh = function(){
    $ionicLoading.show();
    Users.getList().then(function(users){
      $scope.users = users;
      $ionicLoading.hide();

    }, function(msg){
      alert(msg);
    });
    $scope.$broadcast('scroll.refreshComplete');
  }

  $scope.delete = function(id){
    Users.deleteUser(id);
  }

  $scope.showButton = {
    showDelete: false
  };

  $scope.moveItem = function(user, fromIndex, toIndex) {
    $scope.users.splice(fromIndex, 1);
    $scope.users.splice(toIndex, 0, user);
  };


  $ionicModal.fromTemplateUrl('contact-modal.html', {

    scope: $scope,
    animation: 'slide-in-up'

  }).then(function(modal) {
    $scope.modal = modal
  })

  $scope.openModal = function() {
    $scope.modal.show()
    Users.getOneRandomUser().then(function(user){
      $scope.user = user;
    }, function(msg){
      alert(msg);
    });
  };

  $scope.closeModal = function(user) {
    $scope.modal.hide();
    Users.addUser(user);
  };

  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });


})

.controller('userCtrl', function($scope, Users, $stateParams){
  $scope.user = Users.getUserById($stateParams.id);
})
