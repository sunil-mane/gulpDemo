angular.module('demoApp').controller('loginCtrl', function($scope, $state, loginService){
    $scope.loginObj = loginService.getRemember();
    
    $scope.login = function(){
        if(loginService.login($scope.loginObj)){
            $state.go('home');
        }else{
            $state.go('login');
        }
    };
});
