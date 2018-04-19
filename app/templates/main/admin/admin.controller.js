;(function () {
    'use strict';

    angular.module('app')
        .controller('AdminController', AdminController);


    AdminController.$inject = ['usersList', '$rootScope', 'user', 'toastr'];

    function AdminController(usersList, $rootScope, user, toastr) {
        let vm = this;

        if($rootScope.user.role != 'admin') {
            $state.go('main.dashboard');
            return false;
        }
        vm.users = usersList;
        vm.isCreate = false;
        vm.isEdit = [];
        let emptyUser = {
            role: 'user'
        };
        vm.newUser = _.extend({}, emptyUser);

        vm.remove = remove;
        vm.edit = edit;
        vm.saveUser = save;
        vm.create = create;
        vm.checkTrue = elem => elem;

        function remove(userData, index) {
            if(confirm('Ви дійсно хочете видалити користувача: ' + userData.name + ' ' + userData.surname)) {
                user.delete(userData.objectId)
                    .then(() => {
                        toastr.success('Користувача видалено');
                        vm.users.splice(index, 1);
                    });
            }
        }

        function edit(index) {
            vm.isEdit[index] = !vm.isEdit[index];
        }

        function save(userData, index) {
            vm.isEdit[index] = false;
            user.save(userData)
                .then(() => {
                    toastr.success('Дані успішно збережені');
                });
        }

        function create() {
            user.create(vm.newUser)
                .then((res) => {
                    toastr.success('Користувача створено');
                    vm.users.push(_.extend({}, vm.newUser, res));
                    vm.newUser = _.extend({}, emptyUser);
                    vm.isCreate = false;
                })

        }
    }
})();