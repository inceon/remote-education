;(function () {
    'use strict';

    angular.module('app')
        .controller('CourseController', CourseController);

    CourseController.$inject = ['lessons', '$stateParams', 'courses'];

    function CourseController(lessons, $stateParams, courses) {
        let vm = this;

        vm.lessons = lessons;
        vm.course = $stateParams.course;
        vm.tab = 'lessons';
        vm.changeTab = changeTab;

        if(_.isEmpty(vm.course)) {
            courses.get($stateParams.id)
                .then(res => vm.course = res);
        }

        function changeTab() {
            if(vm.tab === 'lessons') {
                vm.tab = 'users';
            } else {
                vm.tab = 'lessons'
            }
        }
    }
})();