;(function () {
    'use strict';

    angular.module('app')
        .controller('LessonController', LessonController);


    LessonController.$inject = ['$stateParams', 'lesson'];

    function LessonController($stateParams, lesson) {
        let vm = this;

        vm.lesson = $stateParams.lesson;

        if(_.isEmpty(vm.lesson)) {
            lesson.get($stateParams.id)
                  .then(res => vm.lesson = res);
        }
    }
})();