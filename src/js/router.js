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