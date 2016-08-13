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
