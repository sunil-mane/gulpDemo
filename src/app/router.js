/**
 * UI Router
 * @returns {undefined}
 */

 (function(){
    'use strict';
    
    angular
        .module('demoApp')
        .config([ "$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {
        //
        // For any unmatched url, redirect to /state1
        $urlRouterProvider.otherwise("/login");
        //
        // Now set up the states
        $stateProvider
        .state('login', {
            authenticate:false,
            url: "/login",
            templateUrl: "app/views/login/login.html",
            controller: 'loginCtrl'
        })
        .state('home', {
            authenticate:true,
            url: "/home",
            templateUrl: "app/views/home/home.html",
            controller: 'homeCtrl'
        })
        .state('home.customers', {
            authenticate:true,
            url: "/customers",
            templateUrl: "app/views/customer/customers.html",
            controller: 'customerCtrl'
        })
        .state('home.users', {
            authenticate:true,
            url: "/users",
            templateUrl: "app/views/user/users.html",
            controller: 'userCtrl'
        })
        .state('home.products', {
            authenticate:true,
            url: "/products",
            templateUrl: "app/views/product/products.html",
            controller: 'productCtrl'
        })
        .state('logout', {
            authenticate:false,
            url:'/logout',
            controller: [ "$state", "loginService", function ($state, loginService) {
                if(loginService.logout()){
                    $state.go('login');
                }

            }]
        });
    }]);

})();

