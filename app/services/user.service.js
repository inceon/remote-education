;(function () {

    'use strict';

    angular.module('service.user', [])
        .service('user', user);


    user.$inject = ['http', 'url', '$rootScope', '$localStorage', 'toastr'];

    function user(http, url, $rootScope, $localStorage, toastr) {


        return {
            login: login,
            register: register,
            one: one,
            all: all,
            logout: logout,
            delete: deleteF,
            save: save,
            create: create
        };

        /**
         * Function for gettinf weather
         * @param {object} data
         * @param {string} data.email
         * @param {string} data.pass
         * @returns {*}
         */
        function login(data) {
            return http.get(url.user, {
                where: {
                    "email": data.email,
                    "pass": data.password,
                }
            })
            .then(function (res) {
                if(_.isEmpty(res.results)) {
                    toastr.error('Користувача не знайдено');
                    return false;
                }
                $rootScope.user = res.results[0];
                $localStorage.userId = res.results[0].objectId;
                return res.results;
            })
        }

        function register(data) {
            return http.post(url.user, data)
                        .then(function (res) {
                            one(res.objectId)
                                .then(function (res) {
                                    $rootScope.user = res;
                                });
                            return res;
                        });
        }

        function one(userId) {
            return http
                .get(url.user, {
                    where: {
                        "objectId": userId
                    }
                })
                .then(res => res.results[0]);
        }
        
        function deleteF(userId) {
            return http
                .delete(url.user + '/' + userId)
                .then(function (res) {
                    return res.results;
                });
        }

        function all() {
            return http.get(url.user)
                .then(res => res.results);
        }

        /**
         * Function for logout user
         */
        function logout() {
            delete $rootScope.user;
            delete $localStorage.userId;
        }

        function save(user) {
            delete user.createdAt;
            delete user.updatedAt;
            return http
                .put(url.user + '/' + user.objectId, user)
                .then(function (res) {
                    return res.results;
                });
        }

        function create(user) {
            return http
                .post(url.user, user);
        }
    }
})();