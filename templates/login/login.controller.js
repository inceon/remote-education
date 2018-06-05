;(function () {
    'use strict';
    angular.module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$state', 'user'];
    function LoginController($state, user) {
        let vm = this;

        vm.user = {
            email: '',
            password: ''
        };
        vm.login = () => {
            if(!_.isEmpty(vm.user.email) && !_.isEmpty(vm.user.password)) {
                user.login(vm.user)
                    .then((res) => {
                        $state.go('main.dashboard');
                    });

            } else {
                vm.error = true;
            }
        }
    }
})();