;(function () {
    'use strict';

    angular.module('app')
        .controller('TestEdit', TestEdit);


    TestEdit.$inject = ['$stateParams', 'test', 'toastr'];

    function TestEdit($stateParams, test, toastr) {
        let vm = this;

        vm.test = $stateParams.test;
        vm.parsedTest = [];
        vm.addTest = addTest;
        vm.addAnswer = addAnswer;

        if(!_.isEmpty(vm.test['questions'])) {
            _.each(JSON.parse(vm.test['questions']), (question, idx) => {
                vm.parsedTest[idx] = {};
                vm.parsedTest[idx]['question'] = question;
            });
        }
        if(!_.isEmpty(vm.test['answers'])) {
            _.each(JSON.parse(vm.test['answers']), (answer, idx) => {
                vm.parsedTest[idx]['answer'] = answer;
            });
        }

        if(!_.isEmpty(vm.test['right'])) {
            _.each(JSON.parse(vm.test['right']), (answer, idx) => {
                vm.parsedTest[idx]['right'] = answer;
            });
        }

        function addTest() {
            vm.parsedTest.push({
                question: 'Запитання',
                answer: [],
                right: -1
            });
        }

        function addAnswer(test) {
            test.answer.push('Відповідь');
        }
    }
})();