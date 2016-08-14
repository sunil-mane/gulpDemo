/**
 * User Controller
 * @returns {undefined}
 */

 (function(){
 	'use strict';
 	
 	angular.module('demoApp').controller('userCtrl', ['$scope', 'userService', function($scope, userService){

 		userService.getUsers().then(function(response){
 			$scope.users = response.data;

 		}).catch(function(response){
 			console.log('Error : ' + response);
 		});

 	}]);

 })();


