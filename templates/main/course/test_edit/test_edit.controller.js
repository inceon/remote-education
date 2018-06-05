;(function () {
    'use strict';

    angular.module('app')
        .controller('TestEdit', TestEdit);


    TestEdit.$inject = ['$stateParams', 'test', 'toastr', '$state'];

    function TestEdit($stateParams, test, toastr, $state) {
        let vm = this;

        vm.test = $stateParams.test;
        vm.parsedTest = [];
        vm.addTest = addTest;
        vm.addAnswer = addAnswer;
        vm.saveTest = saveTest;
        vm.removeAnswer = removeAnswer;

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

        function saveTest() {
            let testData = {
                objectId    : vm.test.objectId,
                name        : vm.test.name,
                questions   : JSON.stringify(vm.parsedTest.map(el => el.question)),
                answers     : JSON.stringify(vm.parsedTest.map(el => el.answer)),
                right       : JSON.stringify(vm.parsedTest.map(el => el.right))
            };

            test.save(testData)
                .then(res => {
                    $state.go('main.test', {test: testData, id: testData.objectId});
                    toastr.success('Тест успішно збережений.');
                })
                .catch(res => toastr.error('Помилка збереження.'));
        }

        function removeAnswer(test, index) {
            test.answer.splice(index, 1);
        }
    }
})();