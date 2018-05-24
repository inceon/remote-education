;(function () {
    'use strict';

    angular.module('app')
        .controller('TestEdit', TestEdit);


    TestEdit.$inject = ['$stateParams', 'test', 'toastr'];

    function TestEdit($stateParams, test, toastr) {
        let vm = this;

        vm.testData = $stateParams.test;
        vm.remove  = remove;


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