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
        vm.isEdit = [];

        vm.remove = remove;
        vm.edit = edit;
        vm.saveUser = save;

        function remove(user) {
            if(confirm('Ви дійсно хочете видалити користувача: ' + user.name + ' ' + user.surname)) {
                user.delete(user.objectId);
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
    }
})();