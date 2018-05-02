;(function () {
    'use strict';

    angular.module('app')
        .controller('CourseController', CourseController);

    CourseController.$inject = ['lessons', 'tests', 'test', 'lesson', '$stateParams', 'courses', 'group', 'toastr', '$state'];

    function CourseController(lessons, tests, test, lesson, $stateParams, courses, group, toastr, $state) {
        let vm = this;

        vm.lessons = lessons;
        vm.tests = tests;
        vm.course = $stateParams.course;
        vm.tab = 'lessons';
        vm.groups = undefined;
        vm.newGroupId = undefined;

        vm.changeTab = changeTab;
        vm.removeGroup = removeGroup;
        vm.removeLesson = removeLesson;
        vm.notContain = notContain;
        vm.addGroup = addGroup;
        vm.addLesson = addLesson;
        vm.saveCourseName = saveCourseName;

        if(_.isEmpty(vm.course)) {
            courses.get($stateParams.id)
                .then(res => vm.course = res);
        }

        function changeTab() {
            if(vm.tab === 'lessons') {
                vm.tab = 'groups';
                if(_.isEmpty(vm.groups)) {
                    courses.groups($stateParams.id)
                        .then(res => vm.groups = res);
                    group.all()
                        .then(res => vm.allGroups = res);
                }
            } else {
                vm.tab = 'lessons';
            }
        }

        function removeGroup(groupData, index) {
            if(confirm('Ви дійсно хочете видалити групу: ' + groupData.name + '?')) {
                courses.deleteGroup(groupData.id)
                    .then(() => {
                        toastr.success('Групу видалено');
                        vm.groups.splice(index, 1);
                    });
            }
        }

        function removeLesson(lessonData, index, event) {
            event.stopPropagation();
            event.stopImmediatePropagation();

            if(confirm('Ви дійсно хочете видалити лекцію: ' + lessonData.name + '?')) {
                lesson.delete(lessonData.objectId)
                    .then(() => {
                        toastr.success('Лекцію видалено');
                        vm.lessons.splice(index, 1);
                    });
            }
        }

        function removeTest(testData, index, event) {
            event.stopPropagation();
            event.stopImmediatePropagation();

            if(confirm('Ви дійсно хочете видалити тест: ' + testData.name + '?')) {
                test.delete(testData.objectId)
                    .then(() => {
                        toastr.success('Тест видалено');
                        vm.tests.splice(index, 1);
                    });
            }
        }

        function notContain(groups) {
            return function (item) {
                for(let group of groups) {
                    if(group.objectId === item.objectId) {
                        return false;
                    }
                }
                return true;
            }
        }

        function addGroup() {
            courses.addGroup($stateParams.id, vm.newGroupId)
                .then(() => {
                    toastr.success('Группа успішно додана');
                    group.get(vm.newGroupId)
                        .then((res) => {
                            vm.groups.push(res);
                            vm.newGroupId = undefined;
                        });
                })
        }

        function addLesson() {
            if(vm.addSmth) {
                lesson.add($stateParams.id, vm.newName)
                    .then((res) => {
                        toastr.success('Лекція успішно додана');
                        vm.lessons.push({
                            name: vm.newName,
                            course: $stateParams.id,
                            objectId: res.objectId,
                            text: '### Ви можете змінити текст цього курсу'
                        });
                        vm.newName = undefined;
                    })
            } else {
                alert(0);
            }
        }

        function saveCourseName() {
            courses.update($stateParams.id, {
                name: vm.course.name
            })
            .then(() => toastr.success('Назва успішно збережена'));
        }

    }
})();