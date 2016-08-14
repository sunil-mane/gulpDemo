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

