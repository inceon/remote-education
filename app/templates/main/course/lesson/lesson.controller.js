;(function () {
    'use strict';

    angular.module('app')
        .controller('LessonController', LessonController);


    LessonController.$inject = ['$stateParams', 'lesson', 'toastr'];

    function LessonController($stateParams, lesson, toastr) {
        let vm = this;

        vm.lesson = $stateParams.lesson;
        vm.saveText = saveText;
        vm.changeEdit = changeEdit;
        vm.isEdit = true;

        if(_.isEmpty(vm.lesson)) {
            lesson.get($stateParams.id)
                  .then(res => vm.lesson = res);
        }

        function saveText() {
            lesson.save(vm.lesson)
                .then(() => {
                    toastr.success('Текст упішно збережено');
                });
        }

        function changeEdit() {
            vm.isEdit = !vm.isEdit;
        }
    }
})();