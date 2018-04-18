;(function () {

    'use strict';

    angular.module('service.courses', [])
        .service('courses', courses);


    courses.$inject = ['http', 'url', '$rootScope'];

    function courses(http, url, $rootScope) {

        return {
            all: all,
            userAll: userAll,
            get: get
        };

        function all(data) {
            return http.get(url.courses)
                        .then(res => res.results)
        }

        function userAll(user) {
            return http.get(url.user_course, {
                where: {
                    "user": user
                }
            })
            .then(res => res.results)
        }

        function get(courseId) {
            return http.get(url.courses, {
                where: {
                    "objectId": courseId
                }
            })
            .then(res => res.results[0])
        }
    }
})();