angular.module('serviceApp')

// Controller for the users view
.controller('usersCtrl', function($scope, Users, $ionicLoading, $ionicModal){

  // To display load bar during the loading of users
  $ionicLoading.show({
    template: '<i class="ion-load-a"></i>Loading...'
  });

  // To load the list of users when i open the serviceApp
  Users.getList().then(function(users){
    $scope.users = users;
    $ionicLoading.hide();

  }, function(msg){
    alert(msg);
  });

  // To load a new list of 5 random users when i do a pull to refresh
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


  $scope.deleteBySeed = function(seed){
    Users.deleteUserBySeed(seed);
  }

  $scope.showReorderButton = false;

  // To activate the sort of each cards
  $scope.longPressCard = function(showReorderState){
    $scope.showReorderButton = !showReorderState;
  }

  // To move the card in the list of users
  $scope.moveCard = function(user, fromIndex, toIndex) {
    $scope.users.splice(fromIndex, 1);
    $scope.users.splice(toIndex, 0, user);
  };

  // To bind the modal view
  $ionicModal.fromTemplateUrl('modal-user.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal
  })

  // To display the modal view when i click on button addUser
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

// Controller for user view
.controller('userCtrl', function($scope, Users, $stateParams){
  $scope.user = Users.getUserBySeed($stateParams.seed);
})


// Controller for modal view
.controller('ModalAddUserCtrl', function($scope, $ionicModal, Users){

  // To add the random user in the users list when I click on the add button
  $scope.modalAddUser = function(user) {
    Users.addUser(user);
  }

  // To close the modal view
  $scope.closeModal = function() {
    $scope.modal.hide();
  };

})
