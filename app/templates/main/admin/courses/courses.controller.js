;(function () {
    'use strict';

    angular.module('app')
        .controller('CoursesAdminController', CoursesAdminController);


    CoursesAdminController.$inject = ['coursesList', 'courses', 'toastr'];

    function CoursesAdminController(coursesList, courses, toastr) {
        let vm = this;

        vm.courses = coursesList;
        vm.isCreate = false;
        vm.isEdit = [];
        vm.newCourse = {};

        vm.remove = remove;
        vm.edit = edit;
        vm.saveUser = save;
        vm.create = create;
        vm.checkTrue = elem => elem;

        function remove(courseData, index) {
            if(confirm('Ви дійсно хочете видалити курс: ' + courseData.name + '?')) {
                courses.delete(courseData.objectId)
                    .then(() => {
                        toastr.success('Курс видалено');
                        vm.courses.splice(index, 1);
                    });
            }
        }

        function edit(index) {
            vm.isEdit[index] = !vm.isEdit[index];
        }

        function save(courseData, index) {
            vm.isEdit[index] = false;
            courses.save(courseData)
                .then(() => {
                    toastr.success('Дані успішно збережені');
                });
        }

        function create() {
            courses.create(vm.newCourse)
                .then((res) => {
                    toastr.success('Дані про курс створено');
                    vm.courses.push(_.extend({}, vm.newCourse, res));
                    vm.newCourse = {};
                    vm.isCreate = false;
                })

        }
    }
})();