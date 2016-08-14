/**
 * Main Module
 * @returns {undefined}
 */

 (function(){
 	'use strict';
 	angular.module('demoApp',[
 		'ui.router',
 		'ngStorage'
 		]);
 })();

/**
 * Configuration
 * @returns {undefined}
 */

 (function(){
 	'use strict';
 	
 	angular.module('demoApp').run([ "$rootScope", "$state", "loginService", function ($rootScope, $state, loginService) {
 		$rootScope.$on('$stateChangeStart',
 			[ "event", "toState", "toParams", "fromState", "fromParams", function (event, toState, toParams, fromState, fromParams) {
 				if (toState.authenticate && !loginService.isLogedin()) {
 					$state.go('login');
 					event.preventDefault();
                    // transitionTo() promise will be rejected with 
                    // a 'transition prevented' error
                }
            }]);
 	}]);

 })();

/**
 * UI Router
 * @returns {undefined}
 */

 (function(){
    'use strict';
    
    angular.module('demoApp').config([ "$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {
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


/**
 * Customer Service
 * @returns {undefined}
 */

 (function(){
 	'use strict';
 	
 	angular.module('demoApp').factory('customerService', [ "$http",  function($http){
 		return {
 			getCustomers : function(){
 				return $http.get('http://www.w3schools.com/angular/customers.php');
 			}
 		};
 	}]);

 })();

/**
 * Login Service
 * @returns {undefined}
 */

 (function(){
    'use strict';
    
    angular.module('demoApp').factory('loginService', [ "$localStorage", "$sessionStorage", function($localStorage, $sessionStorage){
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
    }]);

})();


/**
 * User Service
 * @returns {undefined}
 */

 (function(){
 	'use strict';
 	angular.module('demoApp').factory('userService', [ "$http", function($http){
 		function getUsers(){
 			return $http.get('api/users');
 		}
 		return {
 			getUsers : getUsers
 		};
 	}]);
 })();
 
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


/**
 * Login Controller
 * @returns {undefined}
 */

 (function(){
 	'use strict';

 	angular.module('demoApp').controller('loginCtrl', [ "$scope", "$state", "loginService", function($scope, $state, loginService){
 		$scope.loginObj = loginService.getRemember();

 		$scope.login = function(){
 			if(loginService.login($scope.loginObj)){
 				$state.go('home');
 			}else{
 				$state.go('login');
 			}
 		};
 	}]);

 })();


/**
 * Product Controller
 * @returns {undefined}
 */

 (function(){
 	'use strict';
 	
 	angular.module('demoApp').controller('productCtrl', [  "$scope", "loginService", function($scope, loginService){

	}]);

 })();



/**
 * User Controller
 * @returns {undefined}
 */

 (function(){
 	'use strict';
 	
 	angular.module('demoApp').controller('userCtrl', ['$scope', 'userService', function($scope, userService){

 		userService.getUsers().then(function(response){
 			$scope.users = response.data;

 		}).catch(function(response){
 			console.log('Error : ' + response);
 		});

 	}]);

 })();


