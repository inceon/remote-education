;(function () {
    'use strict';

    angular.module('app')
        .controller('TestController', TestController);


    TestController.$inject = ['$stateParams', 'test', 'toastr'];

    function TestController($stateParams, test, toastr) {
        let vm = this;

        vm.test = $stateParams.test;
        vm.parsedTest = [];
        vm.userAnswers = [];
        vm.userResult = undefined;
        vm.parseTest = parseTest;
        vm.saveText = saveText;
        vm.changeEdit = changeEdit;
        vm.sendAnswers = sendAnswers;
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

            test.result.get($stateParams.id)
                .then(res => {
                    if(!_.isEmpty(res)) {
                        vm.userResult = res;
                    } else {
                        _.each(JSON.parse(vm.test['questions']), (question, idx) => {
                            vm.parsedTest[idx] = {};
                            vm.parsedTest[idx]['question'] = question;
                        });
                        _.each(JSON.parse(vm.test['answers']), (answer, idx) => {
                            vm.parsedTest[idx]['answer'] = answer;
                        });
                        _.each(JSON.parse(vm.test['right']), (answer, idx) => {
                            vm.parsedTest[idx]['right'] = answer;
                            vm.userAnswers[idx] = -1;
                        });
                    }
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

        function sendAnswers() {
            let result = 0;
            _.each(vm.parsedTest, (test, idx) => {
                if(vm.userAnswers[idx] == test.right) {
                    result++;
                }
            });
            test.result.send($stateParams.id, result)
                .then(() => {
                    vm.userResult = {
                        result
                    };
                    toastr.success("Відповідь успішно відправлена");
                }, () => {
                    toastr.error("Помилка відправки відповіді");
                });
        }
    }
})();