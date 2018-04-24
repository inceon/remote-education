;(function () {

    'use strict';

    angular.module('service.lesson', [])
        .service('lesson', lesson);


    lesson.$inject = ['http', 'url', '$rootScope'];

    function lesson(http, url, $rootScope) {

        return {
            get: get,
            save: save,
            add: add
        };

        function get(lessonId) {
            return http.get(url.lessons, {
                where: {
                    "objectId": lessonId
                }
            })
            .then(res => res.results[0])
        }

        function save(lesson) {
            return http.put(url.lessons + '/' + lesson.objectId, {
                text: lesson.text
            });
        }

        function add(courseId, name) {
            return http.post(url.lessons, {
                course: courseId,
                name: name,
                text: '### Ви можете змінити текст цього курсу'
            });
        }
    }
})();