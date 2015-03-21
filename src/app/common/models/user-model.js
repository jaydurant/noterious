'use strict';

angular.module('noterious.common')
  .service('UserModel', function (Auth) {
    var service = this,
      currentUser = null;

    service.getCurrentUser = function () {
      return currentUser;
    };

    service.setCurrentUser = function (user) {
      currentUser = user;
    };


    service.login = function (user) {
      return Auth.$authWithPassword({
        email: user.email,
        password: user.password
      }, function(error, authData) {
        if (error) {
          currentUser = null;
          console.error('Authentication failed:', error);
        } else {
          currentUser = authData.uid;
          console.log('Logged in as:', authData.uid);
        }
      });
    };

    service.register = function (user) {
      return Auth.$createUser({
        email: user.email,
        password: user.password
      })
      .then(function (userData) {
        console.log('User ' + userData.uid + ' created successfully!');
        return service.login(user.email, user.password);
      })
      .catch(function (error) {
        console.error('Error: ', error);
        return error;
      });
    };

    service.logout = function () {
      console.log('LOGOUT FIRED!');
      Auth.$unauth();
    };
  });
