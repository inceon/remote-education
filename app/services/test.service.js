;(function () {

    'use strict';

    angular.module('service.test', [])
        .service('test', test);


    test.$inject = ['http', 'url', '$rootScope'];

    function test(http, url, $rootScope) {

        return {
            get: get,
            save: save,
            add: add,
            delete: deleteT
        };

        function get(testId) {
            return http.get(url.tests, {
                where: {
                    "objectId": testId
                }
            })
            .then(res => res.results[0])
        }

        function save(test) {
            return http.put(url.tests + '/' + test.objectId, test);
        }

        function add(courseId, name) {
            return http.post(url.tests, {
                course: courseId,
                name: name
            });
        }

        function deleteT(testId) {
            return http.delete(url.tests + '/' + testId);
        }
    }
})();