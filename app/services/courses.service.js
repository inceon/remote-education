;(function () {

    'use strict';

    angular.module('service.courses', [])
        .service('courses', courses);


    courses.$inject = ['http', 'url', '$q', 'group'];

    function courses(http, url, $q, group) {

        return {
            all: all,
            allMy: allMy,
            update: update,
            get: get,
            lessons: lessons,
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

        function update(id, data) {
            return http.put(url.courses + '/' + id, data)
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