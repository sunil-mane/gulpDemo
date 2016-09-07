/**
 * User Controller
 * @returns {undefined}
 */

 (function(){
 	'use strict';
 	
 	angular
 		.module('demoApp')
 		.controller('userCtrl', userCtrl);

 		userCtrl.$inject = ['$scope', 'userService']

 		function userCtrl($scope, userService){

	 		userService.getUsers().then(function(response){
	 			$scope.users = response.data;

	 		}).catch(function(response){
	 			console.log('Error : ' + response);
	 		});

	 	};

 })();


