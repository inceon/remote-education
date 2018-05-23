;(function () {

    'use strict';

    angular.module('service.test', [])
        .service('test', test);


    test.$inject = ['http', 'url', '$localStorage'];

    function test(http, url, $localStorage) {

        return {
            get: get,
            save: save,
            add: add,
            delete: deleteT,
            result: {
                send: result_send,
                get : result_get
            }
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

        function result_send(testId, result) {
            return http.post(url.test_result, {
                test: testId,
                user: $localStorage.userId,
                result
            });
        }

        function result_get(testId) {
            return http.get(url.test_result, {
                where: {
                    "test": testId,
                    "user": $localStorage.userId
                }
            }).then(res => res.results[0]);
        }
    }
})();