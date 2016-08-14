/**
 * Customer Controller
 * @returns {undefined}
 */

 (function(){
 	'use strict';
 	
 	angular.module('demoApp').controller('customerCtrl', [ "$scope", "customerService", function($scope, customerService){

 		customerService.getCustomers().then(function(response){
 			$scope.customers = response.data.records;
 			console.log($scope.customers);
 		}).catch(function(response){
 			console.log('Error : ' + response);
 		});

 	}]);

 })();

