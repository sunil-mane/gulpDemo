/**
 * Home Controller
 * @returns {undefined}
 */

 (function(){
 	'use strict';
 	
 	angular.module('demoApp').controller('homeCtrl', [ "$scope", "loginService", function($scope, loginService){
 		$scope.user = loginService.getUserEmail();
 	}]);

 })();

