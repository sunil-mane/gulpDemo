angular.module('demoApp',[
    'ui.router',
    'ngStorage'
    
]);
angular.module('demoApp').run(function ($rootScope, $state, loginService) {
    $rootScope.$on('$stateChangeStart',
            function (event, toState, toParams, fromState, fromParams) {
                if (toState.authenticate && !loginService.isLogedin()) {
                    $state.go('login');
                    event.preventDefault();
                    // transitionTo() promise will be rejected with 
                    // a 'transition prevented' error
                }
            });
});

angular.module('demoApp').config(function ($stateProvider, $urlRouterProvider) {
    //
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/login");
    //
    // Now set up the states
    $stateProvider
            .state('login', {
                authenticate:false,
                url: "/login",
                templateUrl: "js/view/login/login.html",
                controller: 'loginCtrl'
            })
            .state('home', {
                authenticate:true,
                url: "/home",
                templateUrl: "js/view/home/home.html",
                controller: 'homeCtrl'
            })
            .state('home.customers', {
                authenticate:true,
                url: "/customers",
                templateUrl: "js/view/customer/customers.html",
                controller: 'customerCtrl'
            })
            .state('home.users', {
                authenticate:true,
                url: "/users",
                templateUrl: "js/view/user/users.html",
                controller: 'userCtrl'
            })
            .state('home.products', {
                authenticate:true,
                url: "/products",
                templateUrl: "js/view/product/products.html",
                controller: 'productCtrl'
            })
            .state('logout', {
                authenticate:false,
                url:'/logout',
                controller: function ($state, loginService) {
                    if(loginService.logout()){
                        $state.go('login');
                    }
                    
                }
            });
});
angular.module('demoApp').factory('customerService', function($http){
    return {
        getCustomers : function(){
            return $http.get('http://www.w3schools.com/angular/customers.php');
        }
    };
});
angular.module('demoApp').factory('loginService', function($localStorage, $sessionStorage){
    return {
        login : function(loginObj){
            if(loginObj.remember){
                $localStorage.email = loginObj.email;
                $localStorage.password = loginObj.password;
            }else{
                delete $localStorage.email;
                delete $localStorage.password;
            }
            $sessionStorage.userEmail = loginObj.email;
           return true;
        },
        getRemember : function(){
            if($localStorage.email){
                return {
                    email:$localStorage.email,
                    password:$localStorage.password,
                    remember:true
                };
            }else{
                return {};
            }
        },
        isLogedin : function(){
            if($sessionStorage.userEmail)
                return true;
            else
                return false;
        },
        logout : function(){
            console.log('logout...');
            delete $sessionStorage.userEmail;
            return true;
        },
        getUserEmail : function(){
            if($sessionStorage.userEmail)
                return $sessionStorage.userEmail;
            else
                return "Guest";
        }
    };
});
/**
 * User Service
 * @returns {undefined}
 */

(function(){
    'use strict';
    angular.module('demoApp').factory('userService', function($http){
        function getUsers(){
            return $http.get('api/users');
        }
    return {
        getUsers : getUsers
    };
});
})();
angular.module('demoApp').controller('customerCtrl', function($scope, customerService){
    
    customerService.getCustomers().then(function(response){
        $scope.customers = response.data.records;
        console.log($scope.customers);
    }).catch(function(response){
        console.log('Error : ' + response);
    });
    
});

angular.module('demoApp').controller('homeCtrl', function($scope, loginService){
   $scope.user = loginService.getUserEmail();
});

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

angular.module('demoApp').controller('productCtrl', function($scope, loginService){

});

angular.module('demoApp').controller('userCtrl', ['$scope', 'userService', function($scope, userService){
    
    userService.getUsers().then(function(response){
        $scope.users = response.data;
        
    }).catch(function(response){
        console.log('Error : ' + response);
    });
    
}]);
