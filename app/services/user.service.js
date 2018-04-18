;(function () {

    'use strict';

    angular.module('service.user', [])
        .service('user', user);


    user.$inject = ['http', 'url', '$rootScope'];

    function user(http, url, $rootScope) {


        return {
            login: login,
            register: register,
            one: one,
            logout: logout
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
                    "pass": data.pass,
                }
            })
            .then(function (res) {
                $rootScope.user = res.results[0];
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
                .then(function (res) {
                    return res.results;
                });
        }

        /**
         * Function for logout user
         */
        function logout() {
            delete $rootScope.user;
        }
    }
})();