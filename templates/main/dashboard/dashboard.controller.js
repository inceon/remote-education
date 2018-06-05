;(function () {
    'use strict';

    angular.module('app')
        .controller('DashboardController', DashboardController);


    DashboardController.$inject = ['coursesData', '$state'];

    function DashboardController(coursesData, $state) {
        let vm = this;

        vm.courses = coursesData;
    }
})();