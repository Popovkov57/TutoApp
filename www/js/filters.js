angular.module('serviceApp')

.filter('fullName', function(){
  return function(user){
    var fullname = user.firstname + ' ' + user.lastname;

    return (fullname.trim() || user.email || 'anonymous');
  }
})
