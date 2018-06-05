;(function () {
    'use strict';
    angular
        .module('factory.url', [])
        .factory('url', url);


    url.$inject = [];

    function url() {
        var baseUrl = 'https://parseapi.back4app.com/classes/';
        var fileUrl = 'https://parseapi.back4app.com/files/';

        return {
            user    : baseUrl + 'Users',
            group   : baseUrl + 'Group',
            courses : baseUrl + 'Courses',
            group_course : baseUrl + 'Group_Course',
            lessons : baseUrl + 'Lessons',
            tests   : baseUrl + 'Tests',
            test_result   : baseUrl + 'Test_result',
            file     : fileUrl,
            fileData     : baseUrl + 'Files',
        };
    }

})();