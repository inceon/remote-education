;(function () {
    angular
        .module('app')
        .config(mainConfig)
    // .config(['$mdIconProvider', function ($mdIconProvider) {
    //     $mdIconProvider
    //         .iconSet('social', 'bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-content-symbol.svg', 24)
    //         .defaultIconSet('bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-content-symbol.svg', 24);
    // }]);

    mainConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function mainConfig($stateProvider, $urlRouterProvider) {


        $urlRouterProvider.otherwise('/home');

        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'templates/homepage/homepage.html',
                controller: 'HomepageController',
                controllerAs: 'vm'
            })
            .state('main', {
                url: '/app',
                template: '<ui-view></ui-view>',
                controller: 'MainController',
                controllerAs: 'vm',

            })
            .state('main.dashboard', {
                url: '/dashboard',
                templateUrl: 'templates/main/dashboard/dashboard.html',
                controller: 'DashboardController',
                controllerAs: 'vm',
                resolve: {
                    courses_user: function (courses, $rootScope) {
                        return courses.userAll($rootScope.objectId);
                    },
                    coursesData: function ($q, courses_user, courses) {
                        return $q.all(courses_user.map((course_user) => {
                            return courses.get(course_user.course);
                        }))
                    }
                }
            })
            .state('main.admin', {
                url: '/admin',
                templateUrl: 'templates/main/admin/admin.html',
                controller: 'AdminController',
                controllerAs: 'vm',
                resolve: {
                    usersList: function (user) {
                        return user.all();
                    }
                }
            })
            .state('login', {
                url: '/login',
                templateUrl: 'templates/login/login.html',
                controller: 'LoginController',
                controllerAs: 'vm',
            })

    }


})();

