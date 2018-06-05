;(function () {
    'use strict';

    angular.module('app')
        .controller('AdminController', AdminController);


    AdminController.$inject = ['$rootScope'];

    function AdminController($rootScope) {
        let vm = this;

        if($rootScope.user.role != 'admin') {
            $state.go('main.dashboard');
            return false;
        }

    }
})();