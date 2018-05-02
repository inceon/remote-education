;(function () {
    'use strict';

    angular.module('app')
        .controller('TestController', TestController);


    TestController.$inject = ['$stateParams', 'test', 'toastr'];

    function TestController($stateParams, test, toastr) {
        let vm = this;

        vm.test = $stateParams.test;
        vm.parsedTest = [];
        vm.parseTest = parseTest;
        vm.saveText = saveText;
        vm.changeEdit = changeEdit;
        vm.isEdit = false;

        if(_.isEmpty(vm.test)) {
            test.get($stateParams.id)
                  .then(res => {
                      vm.test = res;
                      vm.parseTest();
                  });
        } else {
            vm.parseTest();
        }

        function parseTest() {
            _.each(JSON.parse(vm.test['questions']), (question, idx) => {
                vm.parsedTest[idx] = {};
                vm.parsedTest[idx]['question'] = question;
            });
            _.each(JSON.parse(vm.test['answers']), (answer, idx) => {
                vm.parsedTest[idx]['answer'] = answer;
            });
            _.each(JSON.parse(vm.test['right']), (answer, idx) => {
                vm.parsedTest[idx]['right'] = answer;
            });
        }

        function saveText() {
            test.save(vm.test)
                .then(() => {
                    toastr.success('Текст упішно збережено');
                });
        }

        function changeEdit() {
            vm.isEdit = !vm.isEdit;
        }
    }
})();