;(function () {

    'use strict';

    angular.module('service.file', [])
        .service('file', file);


    file.$inject = ['url', 'http', 'Upload', 'back4app'];

    function file(url, http, Upload, back4app) {


        return {
            upload: upload,
            get: get,
            delete: deleteT
        };

        function upload(data) {
            return http.file(url.file + data.file.name, data.file)
                .then((res) => {
                    return http.post(url.fileData, {
                        name: data.file.name,
                        course: data.course,
                        file: res.data.url
                    });
                });
        }

        function get(id) {
            return http.get(url.fileData, {
                where: {
                    'course': id
                }
            }).then(res => res.results);
        }

        function deleteT(fileId) {
            return http.delete(url.fileData + '/' + fileId);
        }

    }
})();