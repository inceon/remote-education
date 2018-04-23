;(function () {

    'use strict';

    angular.module('service.courses', [])
        .service('courses', courses);


    courses.$inject = ['http', 'url', '$rootScope'];

    function courses(http, url, $rootScope) {

        return {
            all: all,
            allMy: allMy,
            get: get,
            lessons: lessons
        };

        function all(data) {
            return http.get(url.courses)
                        .then(res => res.results)
        }

        function allMy(group) {
            return http.get(url.group_course, {
                where: {
                    "group": group
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

        function lessons(courseId) {
            return http.get(url.lessons, {
                where: {
                    "course": courseId
                }
            }).then(res => res.results);
        }
    }
})();