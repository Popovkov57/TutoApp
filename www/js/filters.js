angular.module('serviceApp')

.filter('fullName', function(){
  return function(user){

    var fullname = user.firstname + ' ' + user.lastname;

    if(fullname == ' '){

      if(user.email != ''){

        return user.email;

      }

      return "anonymous";

    }else{

      return (fullname.replace(/\s$/, "").replace(/^\s/, ""));

    }

  }
})
