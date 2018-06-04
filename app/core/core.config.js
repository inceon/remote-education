;(function () {
    angular
        .module('app')
        .config(mainConfig);


    mainConfig.$inject = ['$stateProvider', '$urlRouterProvider', 'markedProvider'];

    function mainConfig($stateProvider, $urlRouterProvider, markedProvider) {

        markedProvider.setOptions({gfm: true});

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
                        return courses.allMy($rootScope.user.group);
                    },
                    coursesData: function ($q, courses_user, courses) {
                        return $q.all(courses_user.map((course_user) => {
                            return courses.get(course_user.course);
                        }))
                    }
                }
            })
            .state('main.course', {
                url: '/course/:id',
                templateUrl: 'templates/main/course/course.html',
                controller: 'CourseController',
                controllerAs: 'vm',
                params: {
                    course: null
                },
                resolve: {
                    lessons: function (courses, $stateParams) {
                        return courses.lessons($stateParams.id);
                    },
                    tests: function (courses, $stateParams) {
                        return courses.tests($stateParams.id);
                    },
                    files: function (file, $stateParams) {
                        return file.get($stateParams.id);
                    },
                }
            })
            .state('main.lesson', {
                url: '/lesson/:id',
                templateUrl: 'templates/main/course/lesson/lesson.html',
                controller: 'LessonController',
                controllerAs: 'vm',
                params: {
                    lesson: null
                }
            })
            .state('main.test', {
                url: '/test/:id',
                templateUrl: 'templates/main/course/test/test.html',
                controller: 'TestController',
                controllerAs: 'vm',
                params: {
                    test: null
                }
            })
            .state('main.test_result', {
                url: '/test/:id/result',
                templateUrl: 'templates/main/course/test_results/test_results.html',
                controller: 'TestResultsController',
                controllerAs: 'vm',
                resolve: {
                    resultsData: function (test, $stateParams) {
                        return test.result.all($stateParams.id);
                    }
                }
            })
            .state('main.test_edit', {
                url: '/test/:id/edit',
                templateUrl: 'templates/main/course/test_edit/test_edit.html',
                controller: 'TestEdit',
                controllerAs: 'vm',
                params: {
                    test: null
                }
            })
            .state('main.admin', {
                url: '/admin',
                templateUrl: 'templates/main/admin/admin.html',
                controller: 'AdminController',
                controllerAs: 'vm'
            })
            .state('main.admin.users', {
                url: '/users',
                templateUrl: 'templates/main/admin/users/users.html',
                controller: 'UsersAdminController',
                controllerAs: 'vm',
                resolve: {
                    usersList: function (user) {
                        return user.all();
                    }
                }
            })
            .state('main.admin.courses', {
                url: '/courses',
                templateUrl: 'templates/main/admin/courses/courses.html',
                controller: 'CoursesAdminController',
                controllerAs: 'vm',
                resolve: {
                    coursesList: function (courses) {
                        return courses.all();
                    }
                }
            })
            .state('login', {
                url: '/login',
                templateUrl: 'templates/login/login.html',
                controller: 'LoginController',
                controllerAs: 'vm',
            })
            .state('logout', {
                url: '/logout',
                controller: function (user, $state) {
                    user.logout();
                    $state.go('home');
                    return true;
                }
            })

    }


})();

