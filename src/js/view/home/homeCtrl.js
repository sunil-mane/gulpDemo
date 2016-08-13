angular.module('demoApp').controller('homeCtrl', function($scope, loginService){
   $scope.user = loginService.getUserEmail();
});
