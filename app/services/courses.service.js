;(function () {

    'use strict';

    angular.module('service.courses', [])
        .service('courses', courses);


    courses.$inject = ['http', 'url', '$q', 'group'];

    function courses(http, url, $q, group) {

        return {
            all: all,
            allMy: allMy,
            save: save,
            get: get,
            delete: deleteC,
            create: create,
            lessons: lessons,
            tests: tests,
            groups: groups,
            addGroup: addGroup,
            deleteGroup: deleteGroup
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

        function save(course) {
            delete course.createdAt;
            delete course.updatedAt;
            return http
                .put(url.courses + '/' + course.objectId, course)
                .then(function (res) {
                    return res.results;
                });
        }

        function get(courseId) {
            return http.get(url.courses, {
                where: {
                    "objectId": courseId
                }
            })
            .then(res => res.results[0])
        }

        function deleteC(courseId) {
            return http
                .delete(url.courses + '/' + courseId)
                .then(function (res) {
                    return res.results;
                });
        }

        function create(course) {
            return http
                .post(url.courses, course);
        }

        function lessons(courseId) {
            return http.get(url.lessons, {
                where: {
                    "course": courseId
                }
            }).then(res => res.results);
        }

        function tests(courseId) {
            return http.get(url.tests, {
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
                    return group.get(instance.group)
                        .then(res => _.extend({}, res, {
                            id: instance.objectId
                        }));
                }))
            })
        }

        function addGroup(courseId, groupId) {
            return http.post(url.group_course, {
                group: groupId,
                course: courseId
            });
        }

        function deleteGroup(groupCourseId) {
            return http.delete(url.group_course + '/' + groupCourseId);
        }
    }
})();