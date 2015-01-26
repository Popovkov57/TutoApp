angular.module('serviceApp')

// to display first name and lastname of the user 
.filter('fullName', function(){
  return function(user){
    var fullname = user.firstname + ' ' + user.lastname;

    return (fullname.trim() || user.email || 'anonymous');
  }
})
