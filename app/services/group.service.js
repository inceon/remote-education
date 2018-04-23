;(function () {

    'use strict';

    angular.module('service.group', [])
        .service('group', group);


    group.$inject = ['http', 'url', '$rootScope'];

    function group(http, url, $rootScope) {


        return {
            all: all,
            get: get
        };

        function all() {
            return http.get(url.group)
                        .then(res => res.results)
        }

        function get(groupId) {
            return http.get(url.group, {
                where: {
                    "objectId": groupId
                }
            }).then(res => res.results[0])
        }
    }
})();