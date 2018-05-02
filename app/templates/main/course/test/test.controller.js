;(function () {
    'use strict';

    angular.module('app')
        .controller('TestController', TestController);


    TestController.$inject = ['$stateParams', 'test', 'toastr'];

    function TestController($stateParams, test, toastr) {
        let vm = this;

        vm.test = $stateParams.test;
        vm.saveText = saveText;
        vm.changeEdit = changeEdit;
        vm.isEdit = false;

        if(_.isEmpty(vm.test)) {
            test.get($stateParams.id)
                  .then(res => vm.test = res);
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