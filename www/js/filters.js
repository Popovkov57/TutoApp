angular.module('serviceApp')

.filter('fullName', function(){
  return function(user){
    return (user.firstname + ' ' + user.lastname);
  }
})
