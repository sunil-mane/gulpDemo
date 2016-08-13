angular.module('demoApp').controller('customerCtrl', function($scope, customerService){
    
    customerService.getCustomers().then(function(response){
        $scope.customers = response.data.records;
        console.log($scope.customers);
    }).catch(function(response){
        console.log('Error : ' + response);
    });
    
});
