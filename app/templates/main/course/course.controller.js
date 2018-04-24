;(function () {
    'use strict';

    angular.module('app')
        .controller('CourseController', CourseController);

    CourseController.$inject = ['lessons', '$stateParams', 'courses', 'group', 'toastr'];

    function CourseController(lessons, $stateParams, courses, group, toastr) {
        let vm = this;

        vm.lessons = lessons;
        vm.course = $stateParams.course;
        vm.tab = 'lessons';
        vm.changeTab = changeTab;
        vm.groups = undefined;
        vm.newGroupId = undefined;
        vm.removeGroup = removeGroup;
        vm.notContain = notContain;
        vm.addGroup = addGroup;

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
                group.delete(groupData.objectId)
                    .then(() => {
                        toastr.success('Групу видалено');
                        vm.groups.splice(index, 1);
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
                        .then((res) => vm.groups.push(res));
                })
        }

    }
})();