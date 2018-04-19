;(function () {
    angular.module('app',
        [
            'app.core',
            'blocks.directives',
            'blocks.request',
            'blocks.services',
            'blocks.filters',

        ])
        .run(runBlock)
        .constant('back4app', {
            appId: 'bUbpES2xKBNkGeNzkJYf3SbBBPR1I6HzkIe1xniK',
            token: 'dsBJyP5VRbxNZgMQEfX5RzqyMpOLFBRa713w0l1j'
        });

    runBlock.$inject = ['$localStorage', 'user', '$rootScope'];

    function runBlock($localStorage, user, $rootScope) {

        if($localStorage.userId) {

            user.one($localStorage.userId)
                .then((res) => {
                    $rootScope.user = res;
                })

        }

    }
})();
