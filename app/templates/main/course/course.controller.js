;(function () {
    'use strict';

    angular.module('app')
        .controller('CourseController', CourseController);

    CourseController.$inject = ['lessons', '$stateParams', 'courses'];

    function CourseController(lessons, $stateParams, courses) {
        let vm = this;

        vm.lessons = lessons;
        vm.course = $stateParams.course;

        if(_.isEmpty(vm.course)) {
            courses.get($stateParams.id)
                .then(res => vm.course = res);
        }
    }
})();