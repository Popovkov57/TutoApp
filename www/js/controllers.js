angular.module('serviceApp')

.controller('usersCtrl', function($scope, Users, $ionicLoading){

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

  $scope.getNewList = function(){
    $ionicLoading.show();

    Users.getList().then(function(users){
      $scope.users = users;
      $ionicLoading.hide();

    }, function(msg){
      alert(msg);
    });

    $scope.$broadcast('scroll.refreshComplete');
  }

  $scope.deleteUser = function(id){
    Users.deleteUserById(id);
  }

  $scope.showButton = {
    showDelete: false,
    showReorder: false
  };

  $scope.longPressItem = function(b){
    $scope.showButton = {
      showDelete: false,
      showReorder: !b
    };
  }

  $scope.moveItem = function(user, fromIndex, toIndex) {
    $scope.users.splice(fromIndex, 1);
    $scope.users.splice(toIndex, 0, user);
  };

})

.controller('userCtrl', function($scope, Users, $stateParams){
  $scope.user = Users.getUserById($stateParams.id);
})



.controller('modalAddUserCtrl', function($scope, $ionicModal, Users){

  $ionicModal.fromTemplateUrl('modal-user.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal
  })

  $scope.openModalAddUser = function() {
    $scope.modal.show()
    Users.getOneRandomUser().then(function(users){
      $scope.user = users[0];
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
