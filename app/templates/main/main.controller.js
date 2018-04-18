;(function () {
    'use strict';

    angular.module('app')
        .controller('MainController', MainController);


    MainController.$inject = ['$rootScope', '$state'];

    function MainController($rootScope, $state) {
        let vm = this;

        if(_.isEmpty($rootScope.user)) {
            $state.go('login');
        }
    }
})();