angular.module('serviceApp')

// majuscule constante Ctrl
.controller('usersCtrl', function($scope, Users, $ionicLoading, $ionicModal){

  $ionicLoading.show({
    template: '<i class="ion-load-a"></i>Loading...'
  });

  Users.getList().then(function(users){
    $scope.users = users;
    $ionicLoading.hide();

  }, function(msg){
    alert(msg);
  });

  $scope.getNewList = function(){
    $ionicLoading.show({
      template: '<i class="ion-load-a"></i>Loading...'
    });

    Users.getList().then(function(users){
      $scope.users = users;
      $ionicLoading.hide();

    }, function(msg){
      alert(msg);
    });

    $scope.$broadcast('scroll.refreshComplete');
  }

  $scope.deleteById = function(id){
    Users.deleteUserById(id);
  }

  $scope.showReorderButton = false;

  $scope.longPressCard = function(showReorderState){
    $scope.showReorderButton = !showReorderState;
  }

  $scope.moveCard = function(Users, user, fromIndex, toIndex) {
    console.log("fromIndex : " +fromIndex);
    console.log("toIndex : " +toIndex);
    console.log(user);

    $scope.users.splice(fromIndex, 1);
    $scope.users.splice(toIndex, 0, user);
  };

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

  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });

})

.controller('userCtrl', function($scope, Users, $stateParams){
  $scope.user = Users.getUserById($stateParams.id);
})



.controller('ModalAddUserCtrl', function($scope, $ionicModal, Users){

  $scope.modalAddUser = function(user) {
    Users.addUser(user);
  }

  $scope.closeModal = function() {
    $scope.modal.hide();
  };

})
