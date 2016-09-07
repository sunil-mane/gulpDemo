/**
 * Home Controller
 * @returns {undefined}
 */

 (function(){
 	'use strict';
 	
 	angular
 		.module('demoApp')
 		.controller('homeCtrl', homeCtrl);
 		
 		homeCtrl.$inject = [ "$scope", "loginService"]
 		
 		function homeCtrl($scope, loginService){
 			$scope.user = loginService.getUserEmail();
 		};

 })();

