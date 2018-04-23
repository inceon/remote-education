;(function () {

    'use strict';

    angular.module('service.courses', [])
        .service('courses', courses);


    courses.$inject = ['http', 'url', '$q', 'group'];

    function courses(http, url, $q, group) {

        return {
            all: all,
            allMy: allMy,
            get: get,
            lessons: lessons,
            groups: groups
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

        function groups(courseId) {
            return http.get(url.group_course, {
                where: {
                    "course": courseId
                }
            }).then((res) => {
                return $q.all(res.results.map((instance) => {
                    return group.get(instance.group);
                }))
            })
        }
    }
})();