;(function () {
    'use strict';

    angular.module('app')
        .controller('UsersAdminController', UsersAdminController);


    UsersAdminController.$inject = ['usersList', 'group', 'user', 'toastr'];

    function UsersAdminController(usersList, group, user, toastr) {
        let vm = this;

        vm.users = usersList;
        vm.groups = [];

        group.all()
            .then(res => vm.groups = res);

        _.each(vm.users, user => {
            group.get(user.group)
                .then(res => user.group = res);
        });



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
            if(Object.keys(userData).length != 6) {
                toastr.error('Ви ввели не всі дані');
                return false;
            }


            user.save(_.extend({}, userData, {
                group: userData.group.objectId
            }))
                .then(() => {
                    toastr.success('Дані успішно збережені');
                });
        }

        function create() {
            if(Object.keys(vm.newUser).length != 6) {
                toastr.error('Ви ввели не всі дані');
                return false;
            }

            user.create(
                _.extend({}, vm.newUser, {
                    group: vm.newUser.group.objectId
                })
            )
                .then((res) => {
                    toastr.success('Користувача створено');
                    vm.users.push(_.extend({}, vm.newUser, res));
                    vm.newUser = _.extend({}, emptyUser);
                    vm.isCreate = false;
                })

        }
    }
})();