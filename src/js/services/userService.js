/**
 * User Service
 * @returns {undefined}
 */

(function(){
    'use strict';
    angular.module('demoApp').factory('userService', function($http){
        function getUsers(){
            return $http.get('api/users');
        }
    return {
        getUsers : getUsers
    };
});
})();