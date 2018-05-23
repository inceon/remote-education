;(function () {
    'use strict';

    angular.module('app')
        .controller('TestResultsController', TestResultsController);


    TestResultsController.$inject = ['resultsData'];

    function TestResultsController(resultsData) {
        let vm = this;

        vm.results = resultsData;
    }
})();