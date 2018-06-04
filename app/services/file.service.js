;(function () {

    'use strict';

    angular.module('service.file', [])
        .service('file', file);


    file.$inject = ['url', 'http', 'Upload', 'back4app'];

    function file(url, http, Upload, back4app) {


        return {
            upload: upload,
            get: get
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

        }

    }
})();