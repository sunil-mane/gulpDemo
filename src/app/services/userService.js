/**
 * User Service
 * @returns {undefined}
 */

 (function(){
 	'use strict';
 	
 	angular
 		.module('demoApp')
 		.factory('userService', userService); 

 		userService.$inject = [ "$http"];

 		function userService($http){
	 		function getUsers(){
	 			return $http.get('api/users');
	 		}
	 		return {
	 			getUsers : getUsers
	 		};
	 	};
 })();
 