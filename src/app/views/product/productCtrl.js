/**
 * Product Controller
 * @returns {undefined}
 */

 (function(){
 	'use strict';
 	
 	angular
 		.module('demoApp')
 		.controller('productCtrl', productCtrl);

 		productCtrl.$inject = [  "$scope", "loginService"];
 		
 		function productCtrl($scope, loginService){

		};

 })();


