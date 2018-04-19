;(function () {
    'use strict';

    angular.module('app')
        .controller('AdminController', AdminController);


    AdminController.$inject = ['usersList', '$rootScope', '$scope'];

    function AdminController(usersList, $rootScope, $scope) {
        let vm = this;

        if($rootScope.user.role != 'admin') {
            $state.go('main.dashboard');
            return false;
        }
        vm.users = usersList;
    }
})();