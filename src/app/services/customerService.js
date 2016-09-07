/**
 * Customer Service
 * @returns {undefined}
 */

 (function(){
 	'use strict';
 	
 	angular
 		.module('demoApp')
 		.factory('customerService', customerService);

 		customerService.$inject = [ "$http"];

 		function customerService($http){
	 		return {
	 			getCustomers : function(){
	 				return $http.get('http://www.w3schools.com/angular/customers.php');
	 			}
	 		};
	 	};

 })();
