;(function () {
    'use strict';

    angular.module('app')
        .controller('TestResultsController', TestResultsController);


    TestResultsController.$inject = ['resultsData', 'user', 'test', 'toastr'];

    function TestResultsController(resultsData, user, test, toastr) {
        let vm = this;

        vm.results = resultsData;
        vm.remove  = remove;

        _.each(vm.results, result => {
            user.one(result.user)
                .then(res => {
                    result.user = res;
                })
        });

        function remove(resultData, index) {
            if(confirm('Ви дійсно хочете видалити результат тесту користувача: ' + resultData.user.name + ' ' + resultData.user.surname + '?')) {
                test.result.del(resultData.objectId)
                    .then(() => {
                        toastr.success('Результат видалено');
                        vm.results.splice(index, 1);
                    });
            }
        }
    }
})();