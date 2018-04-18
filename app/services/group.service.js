;(function () {

    'use strict';

    angular.module('service.group', [])
        .service('group', group);


    group.$inject = ['http', 'url', '$rootScope'];

    function group(http, url, $rootScope) {


        return {
            all: all
        };

        function all(data) {
            return http.get(url.group)
                        .then(res => res.results)
        }
    }
})();